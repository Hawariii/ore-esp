import { world } from "@minecraft/server";

import {
    updatePlayerScanner
} from "../core/scanner.js";

import {
    CONFIG
} from "../core/config.js";

import {
    isPlayerMovedEnough,
    floorLocation
} from "../core/utils.js";

/**
 * Posisi terakhir player.
 */
const lastLocations = new Map();

/**
 * Dipanggil setiap player bergerak.
 *
 * Tidak scan setiap langkah,
 * hanya jika player sudah
 * bergerak lebih dari threshold.
 */
export function updatePlayerMovement() {

    for (const player of world.getAllPlayers()) {

        const current =
            floorLocation(
                player.location
            );

        const previous =
            lastLocations.get(
                player.id
            );

        if (
            !isPlayerMovedEnough(
                previous,
                current,
                CONFIG.moveThreshold
            )
        ) {
            continue;
        }

        lastLocations.set(
            player.id,
            current
        );

        updatePlayerScanner(
            player
        );

    }

}

/**
 * Hapus data movement player.
 */
export function removePlayerMovement(
    playerId
) {

    lastLocations.delete(
        playerId
    );

}

/**
 * Clear semua cache movement.
 */
export function clearMovementCache() {

    lastLocations.clear();

}