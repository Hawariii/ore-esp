import {
    ActionFormData
} from "@minecraft/server-ui";

import {
    getHeader
} from "../components/header.js";

import {
    getFooter
} from "../components/footer.js";

import {
    getPlayerData,
    setChunkRadius,
    setVerticalRadius
} from "../../data/playerData.js";

import {
    CONFIG
} from "../../core/config.js";

import {
    rescanPlayer
} from "../../core/scanner.js";

import {
    showMainMenu
} from "./mainMenu.js";

/**
 * Scanner Menu
 */
export async function showScannerMenu(player) {

    const data =
        getPlayerData(
            player.id
        );

    const form =
        new ActionFormData()

            .title("Scanner")

            .body([

                getHeader("SCANNER"),

                "Scanner Settings",

                "",

                `Horizontal Radius`,
                `${data.chunkRadius} Chunks`,

                "",

                `Vertical Radius`,
                `${data.verticalRadius} Chunks`,

                "",

                getFooter()

            ].join("\n"))

            .button("◀ Horizontal")

            .button("▶ Horizontal")

            .button("◀ Vertical")

            .button("▶ Vertical")

            .button("🔄 Refresh Scanner")

            .button("⬅ Back");

    const result =
        await form.show(player);

    if (result.canceled)
        return;

    switch (result.selection) {

        case 0:

            setChunkRadius(
                player.id,
                Math.max(
                    CONFIG.minHorizontalChunks,
                    data.chunkRadius - 1
                )
            );

            rescanPlayer(player);

            return showScannerMenu(player);

        case 1:

            setChunkRadius(
                player.id,
                Math.min(
                    CONFIG.maxHorizontalChunks,
                    data.chunkRadius + 1
                )
            );

            rescanPlayer(player);

            return showScannerMenu(player);

        case 2:

            setVerticalRadius(
                player.id,
                Math.max(
                    CONFIG.minVerticalChunks,
                    data.verticalRadius - 1
                )
            );

            rescanPlayer(player);

            return showScannerMenu(player);

        case 3:

            setVerticalRadius(
                player.id,
                Math.min(
                    CONFIG.maxVerticalChunks,
                    data.verticalRadius + 1
                )
            );

            rescanPlayer(player);

            return showScannerMenu(player);

        case 4:

            rescanPlayer(player);

            return showScannerMenu(player);

        case 5:

            return showMainMenu(player);

    }

}