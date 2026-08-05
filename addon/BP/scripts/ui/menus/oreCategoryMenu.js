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
    toggleOre
} from "../../data/playerData.js";

import {
    ORE_LIST
} from "../../data/ores.js";

import {
    showOreMenu
} from "./oreMenu.js";

/**
 * Semua kategori ore.
 */
const CATEGORY_MAP = {

    valuable: [
        "diamond_ore",
        "deepslate_diamond_ore",
        "emerald_ore",
        "deepslate_emerald_ore"
    ],

    metal: [
        "iron_ore",
        "deepslate_iron_ore",
        "gold_ore",
        "deepslate_gold_ore",
        "copper_ore",
        "deepslate_copper_ore"
    ],

    common: [
        "coal_ore",
        "deepslate_coal_ore",
        "lapis_ore",
        "deepslate_lapis_ore",
        "redstone_ore",
        "deepslate_redstone_ore"
    ],

    nether: [
        "quartz_ore",
        "nether_gold_ore",
        "ancient_debris"
    ]

};

/**
 * Nama kategori.
 */
const CATEGORY_TITLE = {

    valuable: "💎 Valuable",

    metal: "🪙 Metal",

    common: "🪨 Common",

    nether: "🔥 Nether"

};

/**
 * Ambil daftar ore sesuai kategori.
 */
function getCategoryOres(category) {

    const ids =
        CATEGORY_MAP[category] ?? [];

    return ORE_LIST.filter(
        ore => ids.includes(ore.id)
    );

}

/**
 * Menu daftar ore.
 */
export async function showOreCategoryMenu(
    player,
    category
) {

    const data =
        getPlayerData(
            player.id
        );

    const ores =
        getCategoryOres(
            category
        );

    const form =
        new ActionFormData()

            .title("Ore Settings")

            .body([

                getHeader(
                    CATEGORY_TITLE[
                        category
                    ]
                ),

                "Tap an ore to",
                "Enable / Disable it.",

                "",

                getFooter()

            ].join("\n"));

    /**
     * Tambahkan semua ore.
     */
    for (const ore of ores) {

        const enabled =
            data.ores[
                ore.id
            ];

        const icon =
            enabled
                ? "🟢"
                : "🔴";

        form.button(

            `${icon} ${ore.name}`

        );

    }

    /**
     * Tombol kembali.
     */
    form.button(
        "⬅ Back"
    );

    const result =
        await form.show(
            player
        );

    if (
        result.canceled
    ) return;

    /**
     * Back.
     */
    if (
        result.selection ===
        ores.length
    ) {

        showOreMenu(
            player
        );

        return;

    }

    /**
     * Toggle ore.
     */
    const ore =
        ores[
            result.selection
        ];

    toggleOre(

        player.id,

        ore.id

    );

    /**
     * Refresh menu.
     */
    showOreCategoryMenu(

        player,

        category

    );

}