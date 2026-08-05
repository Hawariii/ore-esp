import "./events/playerSpawn.js";
import "./events/playerLeave.js";
import "./events/dimensionChange.js";
import "./events/tick.js";

import { world } from "@minecraft/server";

import { showMainMenu } from "./ui/menus/mainMenu.js";

const MENU_ITEM = "oreesp:menu";

world.afterEvents.itemUse.subscribe(event => {

    const { source, itemStack } = event;

    if (source.typeId !== "minecraft:player")
        return;

    if (!itemStack)
        return;

    if (itemStack.typeId !== MENU_ITEM)
        return;

    showMainMenu(source);

});