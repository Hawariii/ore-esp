import { world } from "@minecraft/server";

import {
    deletePlayerData
} from "../data/playerData.js";

import {
    clearPlayerCache
} from "../core/cache.js";

import {
    removePlayerMovement
} from "./playerMove.js";

/**
 * Player keluar world.
 */
world.afterEvents.playerLeave.subscribe(event => {

    const playerId = event.playerId;

    deletePlayerData(
        playerId
    );

    clearPlayerCache(
        playerId
    );

    removePlayerMovement(
        playerId
    );

});