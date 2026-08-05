import { world } from "@minecraft/server";

import {
    getPlayerData
} from "../data/playerData.js";

import {
    updatePlayerScanner
} from "../core/scanner.js";

/**
 * Player join.
 */
world.afterEvents.playerSpawn.subscribe(event => {

    const {
        player,
        initialSpawn
    } = event;

    if (!initialSpawn)
        return;

    getPlayerData(
        player.id
    );

    updatePlayerScanner(
        player
    );

});