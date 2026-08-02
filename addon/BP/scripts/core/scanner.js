import { world, system } from "@minecraft/server";

import {
    CONFIG
} from "./config.js";

import {
    ORES
} from "../data/ores.js";

import {
    getChunkKey,
    getBlockKey,
    hasChunk,
    getChunk,
    setChunk,
    deleteChunk,
    getPlayerBlocks,
    setPlayerBlocks,
    getPlayerChunks,
    setPlayerChunks,
    queueRemove
} from "./cache.js";

import {
    createGlow
} from "./renderer.js";

/**
 * Queue chunk scan.
 */
const scanQueue = [];

/**
 * Last access tick.
 */
const chunkLastAccess = new Map();

/**
 * Chunk diproses tiap tick.
 */
const SCAN_PER_TICK = 2;

/**
 * Cache timeout.
 */
const CACHE_TIME = 20 * 60;

/**
 * Ambil koordinat chunk.
 */
export function getChunkPos(
    x,
    z
) {

    return {
        x: Math.floor(x / 16),
        z: Math.floor(z / 16)
    };

}

/**
 * Jarak chunk.
 */
function chunkDistance(
    ax,
    az,
    bx,
    bz
) {

    const dx = ax - bx;
    const dz = az - bz;

    return dx * dx + dz * dz;

}

/**
 * Semua chunk sekitar player.
 */
export function getNearbyChunks(
    player
) {

    const origin = getChunkPos(
        player.location.x,
        player.location.z
    );

    const chunks = [];

    for (
        let x = origin.x - CONFIG.chunkRadius;
        x <= origin.x + CONFIG.chunkRadius;
        x++
    ) {

        for (
            let z = origin.z - CONFIG.chunkRadius;
            z <= origin.z + CONFIG.chunkRadius;
            z++
        ) {

            chunks.push({
                x,
                z,
                distance: chunkDistance(
                    origin.x,
                    origin.z,
                    x,
                    z
                )
            });

        }

    }

    chunks.sort(
        (a, b) =>
            a.distance - b.distance
    );

    return chunks;

}

/**
 * Scan satu chunk.
 */
export function scanChunk(
    player,
    chunkX,
    chunkZ
) {

    const dimension = player.dimension;

    const minX = chunkX * 16;
    const maxX = minX + 15;

    const minZ = chunkZ * 16;
    const maxZ = minZ + 15;

    const centerY = Math.floor(
        player.location.y
    );

    const minY = Math.max(
        dimension.heightRange.min,
        centerY - CONFIG.verticalRadius
    );

    const maxY = Math.min(
        dimension.heightRange.max,
        centerY + CONFIG.verticalRadius
    );

    const ores = [];

    for (
        let x = minX;
        x <= maxX;
        x++
    ) {

        for (
            let z = minZ;
            z <= maxZ;
            z++
        ) {

            for (
                let y = minY;
                y <= maxY;
                y++
            ) {

                const block =
                    dimension.getBlock({
                        x,
                        y,
                        z
                    });

                if (!block)
                    continue;

                const ore =
                    ORES[
                        block.typeId
                    ];

                if (!ore)
                    continue;

                ores.push({
                    block,
                    ore
                });

            }

        }

    }

    return ores;

}

/**
 * Masukkan chunk ke queue.
 */
function enqueueChunk(
    player,
    chunk
) {

    scanQueue.push({
        player,
        chunk
    });

}

/**
 * Paksa scan ulang player.
 */
export function rescanPlayer(
    player
) {

    setPlayerChunks(
        player.id,
        new Set()
    );

    updatePlayerScanner(
        player
    );

}

/**
 * Update scanner player.
 */
export function updatePlayerScanner(
    player
) {

    const playerId = player.id;

    const newChunks = new Set();
    const newBlocks = new Set();

    const nearbyChunks =
        getNearbyChunks(player);

    for (const chunk of nearbyChunks) {

        const chunkKey = getChunkKey(
            player.dimension.id,
            chunk.x,
            chunk.z
        );

        newChunks.add(chunkKey);

        let ores;

        if (hasChunk(chunkKey)) {

            ores = getChunk(chunkKey);

        } else {

            ores = scanChunk(
                player,
                chunk.x,
                chunk.z
            );

            setChunk(
                chunkKey,
                ores
            );

        }

        chunkLastAccess.set(
            chunkKey,
            system.currentTick
        );

        for (const info of ores) {

            const block = info.block;
            const ore = info.ore;

            if (!ore.enabled)
                continue;

            const blockKey =
                getBlockKey(
                    player.dimension.id,
                    block.location.x,
                    block.location.y,
                    block.location.z
                );

            newBlocks.add(blockKey);

            createGlow(
                block,
                ore
            );

        }

    }

    const oldBlocks =
        getPlayerBlocks(playerId);

    for (const key of oldBlocks) {

        if (!newBlocks.has(key)) {

            queueRemove(key);

        }

    }

    setPlayerChunks(
        playerId,
        newChunks
    );

    setPlayerBlocks(
        playerId,
        newBlocks
    );

}

/**
 * Proses queue scan.
 */
export function processScanQueue() {

    let count = 0;

    while (
        scanQueue.length > 0 &&
        count < SCAN_PER_TICK
    ) {

        const data =
            scanQueue.shift();

        if (
            !data?.player?.isValid()
        )
            continue;

        const chunkKey =
            getChunkKey(
                data.player.dimension.id,
                data.chunk.x,
                data.chunk.z
            );

        let ores;

        if (hasChunk(chunkKey)) {

            ores =
                getChunk(chunkKey);

        } else {

            ores = scanChunk(
                data.player,
                data.chunk.x,
                data.chunk.z
            );

            setChunk(
                chunkKey,
                ores
            );

        }

        chunkLastAccess.set(
            chunkKey,
            system.currentTick
        );

        for (const info of ores) {

            if (
                !info.ore.enabled
            )
                continue;

            createGlow(
                info.block,
                info.ore
            );

        }

        count++;

    }

}

/**
 * Bersihkan chunk cache
 * yang sudah lama tidak dipakai.
 */
export function cleanupChunkCache() {

    for (const [
        key,
        tick
    ] of chunkLastAccess) {

        if (
            system.currentTick - tick <
            CACHE_TIME
        )
            continue;

        chunkLastAccess.delete(
            key
        );

        deleteChunk(key);

    }

}

/**
 * Update semua player.
 */
export function updateAllPlayers() {

    for (const player of world.getAllPlayers()) {

        updatePlayerScanner(
            player
        );

    }

}