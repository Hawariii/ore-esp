import { system } from "@minecraft/server";

import {
    CONFIG
} from "../core/config.js";

import {
    updatePlayerMovement
} from "./playerMove.js";

import {
    processScanQueue,
    cleanupChunkCache
} from "../core/scanner.js";

import {
    processRemoveQueue
} from "../core/renderer.js";

/**
 * Main Tick Loop
 *
 * Semua proses addon
 * dijalankan dari sini.
 */
system.runInterval(() => {

    /**
     * Update movement player.
     */
    updatePlayerMovement();

    /**
     * Scan queue.
     */
    processScanQueue();

    /**
     * Remove glow queue.
     */
    processRemoveQueue();

    /**
     * Cleanup chunk cache.
     */
    cleanupChunkCache();

}, CONFIG.scanInterval);