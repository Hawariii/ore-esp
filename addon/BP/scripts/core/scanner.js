import { world } from "@minecraft/server";

import {
    getChunkKey,
    getPlayerChunks,
    setPlayerChunks,
    getPlayerBlocks,
    setPlayerBlocks,
    hasChunk,
    getChunk,
    setChunk,
    getBlockKey,
    queueRemove
} from "./cache.js";

import {
    createGlow
} from "./renderer.js";

import {
    ORES
} from "../data/ores.js";

import {
    CONFIG
} from "./config.js";

/**
 * Queue scan.
 */
const scanQueue = [];

/**
 * Chunk terakhir digunakan.
 */
const chunkLastAccess = new Map();

/**
 * Maksimal chunk discan tiap tick.
 */
const SCAN_PER_TICK = 2;

/**
 * Chunk cache timeout.
 */
const CHUNK_CACHE_TIME = 20 * 60;

/**
 * Hitung jarak chunk.
 */
function chunkDistance(ax, az, bx, bz) {

    const dx = ax - bx;
    const dz = az - bz;

    return dx * dx + dz * dz;

}

/**
 * Hitung chunk dari koordinat block.
 */
export function getChunk(x, z) {

    return {
        x: Math.floor(x / 16),
        z: Math.floor(z / 16)
    };

}

/**
 * Menghasilkan seluruh chunk yang harus discan.
 */
export function getNearbyChunks(player) {

    const origin = getChunk(
        player.location.x,
        player.location.z
    );

    const chunks = [];

    const radius = CONFIG.chunkRadius;

    for (let x = origin.x - radius; x <= origin.x + radius; x++) {

        for (let z = origin.z - radius; z <= origin.z + radius; z++) {

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
        (a, b) => a.distance - b.distance
    );

    return chunks;

}

/**
 * Scan satu chunk.
 */
export function scanChunk(player, chunkX, chunkZ) {

    const dimension = player.dimension;

    const minX = chunkX * 16;
    const minZ = chunkZ * 16;

    const maxX = minX + 15;
    const maxZ = minZ + 15;

    const centerY = Math.floor(player.location.y);

    const minY = Math.max(
        dimension.heightRange.min,
        centerY - CONFIG.verticalRadius
    );

    const maxY = Math.min(
        dimension.heightRange.max,
        centerY + CONFIG.verticalRadius
    );

    const ores = [];

    for (let x = minX; x <= maxX; x++) {

        for (let z = minZ; z <= maxZ; z++) {

            for (let y = minY; y <= maxY; y++) {

                const block = dimension.getBlock({
                    x,
                    y,
                    z
                });

                if (!block) continue;

                const ore = ORES[block.typeId];

                if (!ore) continue;

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
 * Update scanner player.
 *
 * Dipanggil ketika player pindah chunk
 * atau refresh scanner.
 */
export function updatePlayerScanner(player) {

    const playerId = player.id;

    const newChunkSet = new Set();

    const newBlockSet = new Set();

    const nearbyChunks = getNearbyChunks(player);

    for (const chunk of nearbyChunks) {

        const chunkKey = getChunkKey(
            player.dimension.id,
            chunk.x,
            chunk.z
        );

        newChunkSet.add(chunkKey);

        let ores;

        if (hasChunk(chunkKey)) {
            enqueueChunk(player, chunk);
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

        for (const data of ores) {

            const block = data.block;
            const ore = data.ore;

            if (!ore.enabled)
                continue;

            const blockKey = getBlockKey(
                player.dimension.id,
                block.location.x,
                block.location.y,
                block.location.z
            );

            newBlockSet.add(blockKey);

            createGlow(
                block,
                ore
            );

        }

    }

    removeUnusedBlocks(
        playerId,
        newBlockSet
    );

    setPlayerChunks(
        playerId,
        newChunkSet
    );

    setPlayerBlocks(
        playerId,
        newBlockSet
    );

}

/**
 * Remove glow yang keluar radius.
 */
function removeUnusedBlocks(
    playerId,
    newBlocks
) {

    const oldBlocks =
        getPlayerBlocks(playerId);

    for (const key of oldBlocks) {

        if (newBlocks.has(key))
            continue;

        queueRemove(key);

    }

}

/**
 * Force scan ulang.
 */
export function rescanPlayer(player) {

    const playerId = player.id;

    setPlayerChunks(
        playerId,
        new Set()
    );

    updatePlayerScanner(player);

}

/**
 * Scan semua player.
 */
export function updateAllPlayers() {

    for (const player of world.getAllPlayers()) {

        updatePlayerScanner(player);

    }

}

/**
 * Masukkan chunk ke queue.
 */
function enqueueChunk(player, chunk) {

    scanQueue.push({
        player,
        chunk
    });

}

/**
 * Scan queue.
 *
 * Dipanggil setiap tick.
 */
export function processScanQueue() {

    let count = 0;

    while (
        scanQueue.length > 0 &&
        count < SCAN_PER_TICK
    ) {

        const data = scanQueue.shift();

        if (!data.player?.isValid())
            continue;

        const chunkKey = getChunkKey(
            data.player.dimension.id,
            data.chunk.x,
            data.chunk.z
        );

        let ores;

        if (hasChunk(chunkKey)) {

            ores = getChunk(chunkKey);

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

            if (!info.block)
                continue;

            if (!info.ore.enabled)
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
 * Bersihkan cache chunk lama.
 */
export function cleanupChunkCache() {

    for (const [key, tick] of chunkLastAccess.entries()) {

        if (
            system.currentTick - tick <
            CHUNK_CACHE_TIME
        )
            continue;

        chunkLastAccess.delete(key);

        deleteChunk(key);

    }

}