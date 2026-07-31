/**
 * Database semua ore yang didukung Ore ESP.
 *
 * id        = block identifier
 * key       = nama internal
 * color     = index warna outline
 * texture   = index texture ore
 */

export const ORES = [
    {
        key: "diamond",
        id: "minecraft:diamond_ore",
        color: 5,
        texture: 7,
    },
    {
        key: "deepslate_diamond",
        id: "minecraft:deepslate_diamond_ore",
        color: 5,
        texture: 8,
    },
    {
        key: "emerald",
        id: "minecraft:emerald_ore",
        color: 1,
        texture: 9,
    },
    {
        key: "deepslate_emerald",
        id: "minecraft:deepslate_emerald_ore",
        color: 1,
        texture: 10,
    },
    {
        key: "ancient_debris",
        id: "minecraft:ancient_debris",
        color: 9,
        texture: 0,
    },
    {
        key: "gold",
        id: "minecraft:gold_ore",
        color: 4,
        texture: 5,
    },
    {
        key: "deepslate_gold",
        id: "minecraft:deepslate_gold_ore",
        color: 4,
        texture: 6,
    },
    {
        key: "iron",
        id: "minecraft:iron_ore",
        color: 3,
        texture: 3,
    },
    {
        key: "deepslate_iron",
        id: "minecraft:deepslate_iron_ore",
        color: 3,
        texture: 4,
    },
    {
        key: "coal",
        id: "minecraft:coal_ore",
        color: 8,
        texture: 1,
    },
    {
        key: "deepslate_coal",
        id: "minecraft:deepslate_coal_ore",
        color: 8,
        texture: 2,
    },
    {
        key: "copper",
        id: "minecraft:copper_ore",
        color: 2,
        texture: 16,
    },
    {
        key: "deepslate_copper",
        id: "minecraft:deepslate_copper_ore",
        color: 2,
        texture: 17,
    },
    {
        key: "lapis",
        id: "minecraft:lapis_ore",
        color: 6,
        texture: 11,
    },
    {
        key: "deepslate_lapis",
        id: "minecraft:deepslate_lapis_ore",
        color: 6,
        texture: 12,
    },
    {
        key: "redstone",
        id: "minecraft:redstone_ore",
        color: 7,
        texture: 13,
    },
    {
        key: "deepslate_redstone",
        id: "minecraft:deepslate_redstone_ore",
        color: 7,
        texture: 14,
    },
    {
        key: "quartz",
        id: "minecraft:nether_quartz_ore",
        color: 0,
        texture: 15,
    },
    {
        key: "nether_gold",
        id: "minecraft:nether_gold_ore",
        color: 4,
        texture: 18,
    },
];

/**
 * Map id block -> data ore
 */
export const ORE_MAP = new Map(
    ORES.map((ore) => [ore.id, ore])
);