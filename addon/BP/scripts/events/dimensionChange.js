import { world } from "@minecraft/server";

import {
    CONFIG
} from "../core/config.js";

import {
    clearPlayerCache
} from "../core/cache.js";

import {
    updatePlayerScanner
} from "../core/scanner.js";

/**
 * Player pindah dimensi.
 */
world.afterEvents.playerDimensionChange.subscribe(event => {

    if (!CONFIG.clearOnDimensionChange)
        return;

    const {
        player
    } = event;

    clearPlayerCache(
        player.id
    );

    updatePlayerScanner(
        player
    );

});