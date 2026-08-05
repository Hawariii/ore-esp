import {
    world,
    ItemStack
} from "@minecraft/server";

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

    const inventory =
        player.getComponent(
            "minecraft:inventory"
        );

    inventory?.container?.addItem(
        new ItemStack(
            "oreesp:menu",
            1
        )
    );

    updatePlayerScanner(
        player
    );

});