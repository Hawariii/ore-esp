import { world } from "@minecraft/server";

import { CONFIG } from "./config.js";

import {
    getChunkKey,
    getPlayerChunks,
    setPlayerChunks,
    getPlayerBlocks
} from "./cache.js";

import {
    enqueueChunk
} from "./chunk.js";

import {
    removeGlow
} from "./renderer.js";

/**
 * Mengubah koordinat block menjadi koordinat chunk.
 */
export function getChunkPos(x, z) {

    return {
        x: Math.floor(x / 16),
        z: Math.floor(z / 16)
    };

}

/**
 * Menghitung jarak chunk.
 */
function chunkDistance(ax, az, bx, bz) {

    const dx = ax - bx;
    const dz = az - bz;

    return dx * dx + dz * dz;

}

/**
 * Mengambil semua chunk yang berada
 * dalam radius player.
 */
export function getNearbyChunks(player) {

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
        (a, b) => a.distance - b.distance
    );

    return chunks;

}

/**
 * Update scanner player.
 *
 * Dipanggil ketika player spawn,
 * pindah chunk, atau refresh.
 */
export function updatePlayerScanner(player) {

    const playerId = player.id;

    const oldChunks =
        getPlayerChunks(playerId);

    const newChunks = new Set();

    const nearbyChunks =
        getNearbyChunks(player);

    /**
     * Tambahkan chunk baru.
     */
    for (const chunk of nearbyChunks) {

        const chunkKey = getChunkKey(
            player.dimension.id,
            chunk.x,
            chunk.z
        );

        newChunks.add(chunkKey);

        if (oldChunks.has(chunkKey))
            continue;

        enqueueChunk(
            player,
            chunk.x,
            chunk.z
        );

    }

    /**
     * Hapus glow dari chunk
     * yang keluar radius.
     */
    removeUnusedBlocks(
        player,
        oldChunks,
        newChunks
    );

    /**
     * Simpan chunk terbaru.
     */
    setPlayerChunks(
        playerId,
        newChunks
    );

}

/**
 * Paksa scan ulang.
 */
export function rescanPlayer(player) {

    setPlayerChunks(
        player.id,
        new Set()
    );

    updatePlayerScanner(player);

}

/**
 * Menghapus glow yang
 * sudah keluar dari radius.
 */
function removeUnusedBlocks(
    player,
    oldChunks,
    newChunks
) {

    /**
     * Tidak ada chunk lama.
     */
    if (oldChunks.size === 0)
        return;

    const playerBlocks =
        getPlayerBlocks(player.id);

    for (const blockKey of playerBlocks) {

        const parts = blockKey.split("|");

        if (parts.length < 4)
            continue;

        const x = Number(parts[1]);
        const z = Number(parts[3]);

        const chunk = getChunkPos(x, z);

        const chunkKey = getChunkKey(
            player.dimension.id,
            chunk.x,
            chunk.z
        );

        if (newChunks.has(chunkKey))
            continue;

        removeGlow(blockKey);

    }

}

/**
 * Update scanner
 * semua player.
 */
export function updateAllPlayers() {

    for (const player of world.getAllPlayers()) {

        updatePlayerScanner(player);

    }

}