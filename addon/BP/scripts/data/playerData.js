import { CONFIG } from "../core/config.js";
import { ORE_LIST } from "./ores.js";

/**
 * Data semua player.
 */
const players = new Map();

/**
 * Default data player.
 */
function createDefaultData() {

    const oreStates = {};

    for (const ore of ORE_LIST) {

        oreStates[ore.id] = true;

    }

    return {

        /**
         * Master toggle.
         */
        enabled: true,

        /**
         * Horizontal radius.
         */
        chunkRadius:
            CONFIG.chunkRadius,

        /**
         * Vertical radius.
         */
        verticalRadius:
            CONFIG.verticalRadius,

        /**
         * Glow mode.
         * ore
         * box
         * outline
         */
        glowType: "ore",

        /**
         * Default color.
         */
        colorIndex: 0,

        /**
         * Toggle setiap ore.
         */
        ores: oreStates

    };

}

/**
 * Ambil data player.
 */
export function getPlayerData(
    playerId
) {

    if (!players.has(playerId)) {

        players.set(
            playerId,
            createDefaultData()
        );

    }

    return players.get(playerId);

}

/**
 * Set data player.
 */
export function setPlayerData(
    playerId,
    data
) {

    players.set(
        playerId,
        data
    );

}

/**
 * Hapus data player.
 */
export function deletePlayerData(
    playerId
) {

    players.delete(
        playerId
    );

}

/**
 * Reset player.
 */
export function resetPlayerData(
    playerId
) {

    players.set(
        playerId,
        createDefaultData()
    );

}

/**
 * Toggle Ore ESP.
 */
export function toggleESP(
    playerId
) {

    const data =
        getPlayerData(playerId);

    data.enabled =
        !data.enabled;

    return data.enabled;

}

/**
 * Set glow mode.
 */
export function setGlowType(
    playerId,
    type
) {

    const data =
        getPlayerData(playerId);

    data.glowType = type;

}

/**
 * Set color.
 */
export function setColor(
    playerId,
    index
) {

    const data =
        getPlayerData(playerId);

    data.colorIndex = index;

}

/**
 * Set radius.
 */
export function setChunkRadius(
    playerId,
    radius
) {

    const data =
        getPlayerData(playerId);

    data.chunkRadius = radius;

}

/**
 * Set vertical radius.
 */
export function setVerticalRadius(
    playerId,
    radius
) {

    const data =
        getPlayerData(playerId);

    data.verticalRadius = radius;

}

/**
 * Toggle ore.
 */
export function toggleOre(
    playerId,
    oreId
) {

    const data =
        getPlayerData(playerId);

    if (!(oreId in data.ores))
        return false;

    data.ores[oreId] =
        !data.ores[oreId];

    return data.ores[oreId];

}

/**
 * Set ore state.
 */
export function setOreEnabled(
    playerId,
    oreId,
    enabled
) {

    const data =
        getPlayerData(playerId);

    if (!(oreId in data.ores))
        return;

    data.ores[oreId] = enabled;

}

/**
 * Cek ore aktif.
 */
export function isOreEnabled(
    playerId,
    oreId
) {

    const data =
        getPlayerData(playerId);

    return (
        data.ores[oreId] ??
        false
    );

}

/**
 * Semua player data.
 */
export function getAllPlayerData() {

    return players;

}

/**
 * Clear semua data.
 */
export function clearPlayerData() {

    players.clear();

}