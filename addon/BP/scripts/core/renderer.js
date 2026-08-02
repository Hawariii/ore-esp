import { world } from "@minecraft/server";

import {
    hasGlow,
    getGlow,
    setGlow,
    deleteGlow,
    getBlockKey
} from "./cache.js";

/**
 * Spawn glow entity.
 */
export function createGlow(
    block,
    ore
) {

    const key = getBlockKey(
        block.dimension.id,
        block.location.x,
        block.location.y,
        block.location.z
    );

    if (hasGlow(key)) {

        const entity = getGlow(key);

        if (entity?.isValid())
            return entity;

        deleteGlow(key);

    }

    const entity = block.dimension.spawnEntity(
        "es:glowblock",
        {
            x: block.location.x + 0.5,
            y: block.location.y,
            z: block.location.z + 0.5
        }
    );

    setGlow(
        key,
        entity
    );

    updateGlow(
        entity,
        ore
    );

    return entity;

}

/**
 * Update glow entity.
 */
export function updateGlow(
    entity,
    ore
) {

    if (!entity?.isValid())
        return;

    entity.setProperty(
        "es:glow_type",
        ore.glowType
    );

    entity.setProperty(
        "es:ore_index",
        ore.index
    );

    entity.setProperty(
        "es:color_index",
        ore.color
    );

}

/**
 * Remove glow berdasarkan entity.
 */
export function removeGlow(
    entity
) {

    if (!entity?.isValid())
        return;

    entity.triggerEvent(
        "es:despawn"
    );

}

/**
 * Remove glow berdasarkan block key.
 */
export function removeGlowByKey(
    key
) {

    if (!hasGlow(key))
        return;

    const entity = getGlow(key);

    if (entity?.isValid()) {

        entity.triggerEvent(
            "es:despawn"
        );

    }

    deleteGlow(key);

}

import {
    popRemoveQueue,
    getRemoveQueue,
    getCacheStats,
    clearAllCache,
    getGlow
} from "./cache.js";

/**
 * Maksimal glow yang dihapus
 * setiap tick.
 */
const REMOVE_PER_TICK = 50;

/**
 * Proses queue remove.
 */
export function processRemoveQueue() {

    let count = 0;

    while (
        getRemoveQueue().length > 0 &&
        count < REMOVE_PER_TICK
    ) {

        const key = popRemoveQueue();

        if (!key)
            continue;

        removeGlowByKey(key);

        count++;

    }

}

/**
 * Hapus semua glow.
 */
export function removeAllGlow() {

    const stats = getCacheStats();

    if (stats.glows <= 0) {

        clearAllCache();

        return;

    }

    for (const entity of world.getDimension("overworld").getEntities({
        type: "es:glowblock"
    })) {

        if (entity?.isValid()) {

            entity.triggerEvent(
                "es:despawn"
            );

        }

    }

    for (const entity of world.getDimension("nether").getEntities({
        type: "es:glowblock"
    })) {

        if (entity?.isValid()) {

            entity.triggerEvent(
                "es:despawn"
            );

        }

    }

    for (const entity of world.getDimension("the_end").getEntities({
        type: "es:glowblock"
    })) {

        if (entity?.isValid()) {

            entity.triggerEvent(
                "es:despawn"
            );

        }

    }

    clearAllCache();

}