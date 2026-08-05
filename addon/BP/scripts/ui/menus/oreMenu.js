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
    showMainMenu
} from "./mainMenu.js";

import {
    showOreCategoryMenu
} from "./oreCategoryMenu.js";

/**
 * Ore Categories
 */
const CATEGORIES = [

    {
        id: "valuable",
        icon: "",
        name: "Valuable"
    },

    {
        id: "metal",
        icon: "",
        name: "Metal"
    },

    {
        id: "common",
        icon: "",
        name: "Common"
    },

    {
        id: "nether",
        icon: "",
        name: "Nether"
    }

];

/**
 * Ore Menu
 */
export async function showOreMenu(player) {

    const form =
        new ActionFormData()

            .title("Ore Settings")

            .body([

                getHeader("ORE SETTINGS"),

                "Enable / Disable ores",

                "",

                getFooter()

            ].join("\n"));

    for (const category of CATEGORIES) {

        form.button(
            `${category.icon} ${category.name}`
        );

    }

    form.button("Back");

    const result =
        await form.show(player);

    if (result.canceled)
        return;

    if (
        result.selection ===
        CATEGORIES.length
    ) {

        showMainMenu(player);

        return;

    }

    showOreCategoryMenu(

        player,

        CATEGORIES[
            result.selection
        ].id

    );

}
