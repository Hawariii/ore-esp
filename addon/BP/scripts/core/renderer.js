import {
    world
} from "@minecraft/server";

import {
    getBlockKey,
    getGlow,
    setGlow,
    deleteGlow,
    getGlowEntries,
    getRemoveQueue,
    dequeueRemove
} from "./cache.js";

/**
 * Spawn glow entity.
 */
export function createGlow(block, oreData) {

    const key = getBlockKey(
        block.dimension.id,
        block.location.x,
        block.location.y,
        block.location.z
    );

    const old = getGlow(key);

    if (old?.isValid()) {

        updateGlow(old, oreData);

        return old;

    }

    const entity = block.dimension.spawnEntity(
        "es:glowblock",
        {
            x: block.location.x + 0.5,
            y: block.location.y,
            z: block.location.z + 0.5
        }
    );

    entity.nameTag = "";

    entity.setProperty(
        "es:glow_type",
        oreData.style ?? "ore"
    );

    entity.setProperty(
        "es:ore_index",
        oreData.index
    );

    if (oreData.color !== undefined) {

        entity.setProperty(
            "es:color_index",
            oreData.color
        );

    }

    setGlow(key, entity);

    return entity;

}

/**
 * Update entity property.
 */
export function updateGlow(entity, oreData) {

    if (!entity?.isValid()) return;

    entity.setProperty(
        "es:glow_type",
        oreData.style ?? "ore"
    );

    entity.setProperty(
        "es:ore_index",
        oreData.index
    );

    if (oreData.color !== undefined) {

        entity.setProperty(
            "es:color_index",
            oreData.color
        );

    }

}

/**
 * Remove glow by block.
 */
export function removeGlow(block) {

    const key = getBlockKey(
        block.dimension.id,
        block.location.x,
        block.location.y,
        block.location.z
    );

    removeGlowByKey(key);

}

/**
 * Remove glow by key.
 */
export function removeGlowByKey(key) {

    const entity = getGlow(key);

    if (!entity) return;

    try {

        if (entity.isValid()) {

            entity.triggerEvent(
                "es:despawn"
            );

        }

    } catch {}

    deleteGlow(key);

}

/**
 * Remove semua queue.
 *
 * Dipanggil tiap tick.
 */
export function processRemoveQueue(limit = 30) {

    const queue = getRemoveQueue();

    let count = 0;

    for (const key of queue) {

        removeGlowByKey(key);

        dequeueRemove(key);

        count++;

        if (count >= limit)
            break;

    }

}

/**
 * Bersihkan entity invalid.
 */
export function cleanupRenderer() {

    for (const [key, entity] of getGlowEntries()) {

        if (!entity?.isValid()) {

            deleteGlow(key);

            continue;

        }

        try {

            entity.dimension;

        } catch {

            deleteGlow(key);

        }

    }

}

/**
 * Remove semua glow.
 *
 * Dipakai saat reload addon.
 */
export function removeAllGlow() {

    for (const [key, entity] of getGlowEntries()) {

        try {

            if (entity.isValid()) {

                entity.triggerEvent(
                    "es:despawn"
                );

            }

        } catch {}

        deleteGlow(key);

    }

}

/**
 * Debug.
 */
export function getGlowCount() {

    let total = 0;

    for (const _ of getGlowEntries()) {

        total++;

    }

    return total;

}