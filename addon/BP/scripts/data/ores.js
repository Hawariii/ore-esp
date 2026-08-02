/**
 * Ore Registry
 *
 * index harus sama dengan
 * Array.textures di render_controller.
 */

export const ORES = {

    "minecraft:ancient_debris": {
        id: "ancient_debris",
        name: "Ancient Debris",
        index: 0,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:coal_ore": {
        id: "coal_ore",
        name: "Coal Ore",
        index: 1,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:deepslate_coal_ore": {
        id: "deepslate_coal_ore",
        name: "Deepslate Coal Ore",
        index: 2,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:iron_ore": {
        id: "iron_ore",
        name: "Iron Ore",
        index: 3,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:deepslate_iron_ore": {
        id: "deepslate_iron_ore",
        name: "Deepslate Iron Ore",
        index: 4,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:gold_ore": {
        id: "gold_ore",
        name: "Gold Ore",
        index: 5,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:deepslate_gold_ore": {
        id: "deepslate_gold_ore",
        name: "Deepslate Gold Ore",
        index: 6,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:diamond_ore": {
        id: "diamond_ore",
        name: "Diamond Ore",
        index: 7,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:deepslate_diamond_ore": {
        id: "deepslate_diamond_ore",
        name: "Deepslate Diamond Ore",
        index: 8,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:emerald_ore": {
        id: "emerald_ore",
        name: "Emerald Ore",
        index: 9,
        color: 0,
        glowType: "ore",
        enabled: true
    },
    "minecraft:deepslate_emerald_ore": {
        id: "deepslate_emerald_ore",
        name: "Deepslate Emerald Ore",
        index: 10,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:lapis_ore": {
        id: "lapis_ore",
        name: "Lapis Ore",
        index: 11,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:deepslate_lapis_ore": {
        id: "deepslate_lapis_ore",
        name: "Deepslate Lapis Ore",
        index: 12,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:redstone_ore": {
        id: "redstone_ore",
        name: "Redstone Ore",
        index: 13,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:deepslate_redstone_ore": {
        id: "deepslate_redstone_ore",
        name: "Deepslate Redstone Ore",
        index: 14,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:quartz_ore": {
        id: "quartz_ore",
        name: "Nether Quartz Ore",
        index: 15,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:copper_ore": {
        id: "copper_ore",
        name: "Copper Ore",
        index: 16,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:deepslate_copper_ore": {
        id: "deepslate_copper_ore",
        name: "Deepslate Copper Ore",
        index: 17,
        color: 0,
        glowType: "ore",
        enabled: true
    },

    "minecraft:nether_gold_ore": {
        id: "nether_gold_ore",
        name: "Nether Gold Ore",
        index: 18,
        color: 0,
        glowType: "ore",
        enabled: true
    }

};

/**
 * Semua ore dalam bentuk array.
 */
export const ORE_LIST =
    Object.values(ORES);

/**
 * Semua block id ore.
 */
export const ORE_IDS =
    Object.keys(ORES);

/**
 * Ambil data ore
 * berdasarkan block id.
 */
export function getOreFromBlock(
    blockId
) {

    return ORES[blockId] ?? null;

}

/**
 * Ambil data ore
 * berdasarkan id.
 */
export function getOreById(
    id
) {

    return ORE_LIST.find(
        ore => ore.id === id
    ) ?? null;

}

/**
 * Cek apakah block
 * termasuk ore.
 */
export function isOre(
    blockId
) {

    return blockId in ORES;

}

/**
 * Enable / Disable ore.
 */
export function setOreEnabled(
    id,
    enabled
) {

    const ore =
        getOreById(id);

    if (!ore)
        return false;

    ore.enabled = enabled;

    return true;

}

/**
 * Toggle ore.
 */
export function toggleOre(
    id
) {

    const ore =
        getOreById(id);

    if (!ore)
        return false;

    ore.enabled =
        !ore.enabled;

    return ore.enabled;

}

/**
 * Enable semua ore.
 */
export function enableAllOres() {

    for (const ore of ORE_LIST) {

        ore.enabled = true;

    }

}

/**
 * Disable semua ore.
 */
export function disableAllOres() {

    for (const ore of ORE_LIST) {

        ore.enabled = false;

    }

}