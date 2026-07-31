/**
 * Ore ESP Cache System
 *
 * Menyimpan seluruh cache runtime.
 * Tidak ada data yang disimpan permanen.
 */

/**
 * blockKey -> Entity
 *
 * minecraft:overworld:10:64:-25
 */
const glowEntities = new Map();

/**
 * playerId -> Set(chunkKey)
 *
 * Chunk yang sedang aktif untuk player.
 */
const playerChunks = new Map();

/**
 * playerId -> Set(blockKey)
 *
 * Ore yang sedang dirender player.
 */
const playerBlocks = new Map();

/**
 * chunkKey -> Block[]
 *
 * Hasil scan setiap chunk.
 */
const scannedChunks = new Map();

/**
 * Block yang akan dihapus bertahap.
 */
const removeQueue = new Set();

/* ---------------------------------------------------------- */
/* Helpers                                                    */
/* ---------------------------------------------------------- */

export function getBlockKey(dimensionId, x, y, z) {
    return `${dimensionId}:${x}:${y}:${z}`;
}

export function getChunkKey(dimensionId, chunkX, chunkZ) {
    return `${dimensionId}:${chunkX}:${chunkZ}`;
}

/* ---------------------------------------------------------- */
/* Glow Entity Cache                                          */
/* ---------------------------------------------------------- */

export function hasGlow(blockKey) {
    return glowEntities.has(blockKey);
}

export function getGlow(blockKey) {
    return glowEntities.get(blockKey);
}

export function setGlow(blockKey, entity) {
    glowEntities.set(blockKey, entity);
}

export function deleteGlow(blockKey) {
    glowEntities.delete(blockKey);
}

export function clearGlowCache() {
    glowEntities.clear();
}

export function getGlowEntries() {
    return glowEntities.entries();
}

export function getGlowSize() {
    return glowEntities.size;
}

/* ---------------------------------------------------------- */
/* Player Chunk Cache                                         */
/* ---------------------------------------------------------- */

export function getPlayerChunks(playerId) {

    if (!playerChunks.has(playerId)) {
        playerChunks.set(playerId, new Set());
    }

    return playerChunks.get(playerId);
}

export function setPlayerChunks(playerId, chunks) {
    playerChunks.set(playerId, chunks);
}

export function clearPlayerChunks(playerId) {
    playerChunks.delete(playerId);
}

/* ---------------------------------------------------------- */
/* Player Block Cache                                         */
/* ---------------------------------------------------------- */

export function getPlayerBlocks(playerId) {

    if (!playerBlocks.has(playerId)) {
        playerBlocks.set(playerId, new Set());
    }

    return playerBlocks.get(playerId);
}

export function setPlayerBlocks(playerId, blocks) {
    playerBlocks.set(playerId, blocks);
}

export function clearPlayerBlocks(playerId) {
    playerBlocks.delete(playerId);
}

/* ---------------------------------------------------------- */
/* Chunk Scan Cache                                           */
/* ---------------------------------------------------------- */

export function hasChunk(chunkKey) {
    return scannedChunks.has(chunkKey);
}

export function getChunk(chunkKey) {
    return scannedChunks.get(chunkKey);
}

export function setChunk(chunkKey, blocks) {
    scannedChunks.set(chunkKey, blocks);
}

export function deleteChunk(chunkKey) {
    scannedChunks.delete(chunkKey);
}

export function clearChunkCache() {
    scannedChunks.clear();
}

/* ---------------------------------------------------------- */
/* Remove Queue                                                */
/* ---------------------------------------------------------- */

export function queueRemove(blockKey) {
    removeQueue.add(blockKey);
}

export function dequeueRemove(blockKey) {
    removeQueue.delete(blockKey);
}

export function getRemoveQueue() {
    return removeQueue;
}

/* ---------------------------------------------------------- */
/* Cleanup                                                     */
/* ---------------------------------------------------------- */

export function clearPlayer(playerId) {

    clearPlayerBlocks(playerId);
    clearPlayerChunks(playerId);

}

export function clearAllCache() {

    glowEntities.clear();

    playerChunks.clear();

    playerBlocks.clear();

    scannedChunks.clear();

    removeQueue.clear();

}

/* ---------------------------------------------------------- */
/* Debug                                                       */
/* ---------------------------------------------------------- */

export function getCacheInfo() {

    return {
        glowEntities: glowEntities.size,
        playerChunks: playerChunks.size,
        playerBlocks: playerBlocks.size,
        scannedChunks: scannedChunks.size,
        removeQueue: removeQueue.size
    };

}