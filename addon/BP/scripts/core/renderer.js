import {
    addGlowEntity,
    clearGlowEntities,
    getGlowEntity,
    getGlowEntities,
    removeGlowEntity,
} from "./cache.js";

import {
    locationToKey,
    centerLocation,
} from "./utils.js";

/**
 * Spawn glow pada block ore.
 *
 * @param {import("@minecraft/server").Player} player
 * @param {import("@minecraft/server").Block} block
 * @param {{color:number,texture:number}} ore
 * @param {number} style
 */
export function renderOre(player, block, ore, style) {
    const key = locationToKey(block.location);

    if (getGlowEntity(player.id, key)) {
        return;
    }

    let entity;

    try {
        entity = player.dimension.spawnEntity(
            "es:glowblock",
            centerLocation(block.location)
        );
    } catch {
        return;
    }

    switch (style) {
        case 0:
            entity.setProperty("es:glow_type", "box");
            entity.setProperty("es:color_index", ore.color);
            break;

        case 1:
            entity.setProperty("es:glow_type", "ore");
            entity.setProperty("es:ore_index", ore.texture);
            break;

        case 2:
            entity.setProperty("es:glow_type", "outline");
            entity.setProperty("es:color_index", ore.color);
            break;
    }

    addGlowEntity(player.id, key, entity);
}

/**
 * Hapus semua render player.
 * @param {import("@minecraft/server").Player} player
 */
export function clearPlayerRender(player) {
    clearGlowEntities(player.id);
}

/**
 * Bersihkan entity yang sudah invalid.
 * @param {import("@minecraft/server").Player} player
 */
export function cleanupInvalidEntities(player) {
    const entities = getGlowEntities(player.id);

    for (const [key, entity] of entities) {
        try {
            if (!entity.isValid()) {
                removeGlowEntity(player.id, key);
            }
        } catch {
            removeGlowEntity(player.id, key);
        }
    }
}