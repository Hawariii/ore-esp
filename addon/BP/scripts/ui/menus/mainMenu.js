import {
    ActionFormData
} from "@minecraft/server-ui";

import {
    getPlayerData,
    toggleESP
} from "../../data/playerData.js";

import {
    ORE_LIST
} from "../../data/ores.js";

import {
    getHeader
} from "../components/header.js";

import {
    getFooter
} from "../components/footer.js";

import {
    openOreMenu,
    openScannerMenu,
    openSupportMenu,
    openChangelogMenu
} from "../uiManager.js";

/**
 * Main Menu
 */
export async function showMainMenu(player) {

    const data =
        getPlayerData(player.id);

    const enabledCount =
        ORE_LIST.filter(
            ore => data.ores[ore.id]
        ).length;

    const status =
        data.enabled
            ? "§aEnabled"
            : "§cDisabled";

    const body = [

        getHeader(),

        `§fStatus`,
        status,
        "",

        `§fRadius`,
        `${data.chunkRadius} Chunks`,
        "",

        `§fVisible Ores`,
        `${enabledCount} / ${ORE_LIST.length}`,
        "",

        getFooter()

    ].join("\n");

    const form =
        new ActionFormData()

            .title("Ore ESP")

            .body(body)

            .button(
                data.enabled
                    ? "§cDisable ESP"
                    : "§aEnable ESP"
            )

            .button("Ore Settings")

            .button("Scanner")

            .button("Changelog")

            .button("Support")

            .button("Close");

    const response =
        await form.show(player);

    if (
        response.canceled
    ) return;

    switch (
        response.selection
    ) {

        case 0:

            toggleESP(
                player.id
            );

            showMainMenu(
                player
            );

            break;

        case 1:

            openOreMenu(
                player
            );

            break;

        case 2:

            openScannerMenu(
                player
            );

            break;

        case 3:

            openChangelogMenu(
                player
            );

            break;

        case 4:

            openSupportMenu(
                player
            );

            break;

        default:
            break;

    }

}
