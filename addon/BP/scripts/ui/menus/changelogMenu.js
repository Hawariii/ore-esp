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

const CHANGELOG = [

    {
        version: "v1.0.0",
        changes: [

            "✨ Initial Release",

            "⛏ Added Ore ESP",

            "⚡ Fast Chunk Scanner",

            "💎 Per-Ore Toggle",

            "👤 Per Player Settings",

            "📡 Adjustable Scan Radius",

            "🖥 Modern User Interface"

        ]
    }

];

export async function showChangelogMenu(player) {

    const latest =
        CHANGELOG[0];

    const body = [

        getHeader("CHANGELOG"),

        latest.version,

        "",

        ...latest.changes,

        "",

        getFooter()

    ].join("\n");

    const form =
        new ActionFormData()

            .title("Changelog")

            .body(body)

            .button("⬅ Back");

    const result =
        await form.show(player);

    if (result.canceled)
        return;

    showMainMenu(player);

}