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

const LINKS = [

    {
        name: "CurseForge",
        url: "https://legacy.curseforge.com/members/aizhu/projects"
    },

    {
        name: "GitHub",
        url: "https://github.com/Hawariii"
    },

    {
        name: "Discord",
        url: "https://discord.gg/NBjKmzpyxX"
    },

    {
        name: "YouTube",
        url: "https://m.youtube.com/@siaizhu"
    },

    {
        name: "TikTok",
        url: "https://www.tiktok.com/@siiaizhu?_r=1&_t=ZS-94FJMk0cB3B"
    },

    {
        name: "Ko-fi",
        url: "https://ko-fi.com/aizhu"
    },

    {
        name: "Sociabuzz",
        url: "https://sociabuzz.com/aizhu/tribe"
    }

];

export async function showSupportMenu(player) {

    const form =
        new ActionFormData()

            .title("Support")

            .body([

                getHeader("SUPPORT"),

                "Thanks for using Ore ESP!",

                "",

                "Choose a platform",

                "to support the project.",

                "",

                getFooter()

            ].join("\n"));

    for (const link of LINKS) {

        form.button(
            link.name
        );

    }

    form.button("Back");

    const result =
        await form.show(player);

    if (result.canceled)
        return;

    if (
        result.selection ===
        LINKS.length
    ) {

        return showMainMenu(player);

    }

    const selected =
        LINKS[result.selection];

    player.sendMessage("§6━━━━━━━━━━━━━━━━━━━━━━");
    player.sendMessage("§e" + selected.name);
    player.sendMessage("§b" + selected.url);
    player.sendMessage("§7Copy the link above.");
    player.sendMessage("§6━━━━━━━━━━━━━━━━━━━━━━");

    showSupportMenu(player);

}
