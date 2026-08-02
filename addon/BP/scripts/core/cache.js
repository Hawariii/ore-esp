/**
 * Chunk Cache
 * Ore ESP
 */

const chunkCache = new Map();
const glowCache = new Map();

const playerChunks = new Map();
const playerBlocks = new Map();

const removeQueue = [];

/**
 * ===============================
 * Chunk
 * ===============================
 */

export function getChunkKey(
    dimension,
    chunkX,
    chunkZ
) {
    return `${dimension}:${chunkX}:${chunkZ}`;
}

export function hasChunk(key) {
    return chunkCache.has(key);
}

export function getChunk(key) {
    return chunkCache.get(key);
}

export function setChunk(
    key,
    value
) {
    chunkCache.set(
        key,
        value
    );
}

export function deleteChunk(key) {
    chunkCache.delete(key);
}

export function clearChunks() {
    chunkCache.clear();
}

/**
 * ===============================
 * Player Chunk
 * ===============================
 */

export function getPlayerChunks(
    playerId
) {
    return (
        playerChunks.get(playerId) ??
        new Set()
    );
}

export function setPlayerChunks(
    playerId,
    chunks
) {
    playerChunks.set(
        playerId,
        chunks
    );
}

export function clearPlayerChunks(
    playerId
) {
    playerChunks.delete(
        playerId
    );
}

/**
 * ===============================
 * Player Block
 * ===============================
 */

export function getPlayerBlocks(
    playerId
) {
    return (
        playerBlocks.get(playerId) ??
        new Set()
    );
}

export function setPlayerBlocks(
    playerId,
    blocks
) {
    playerBlocks.set(
        playerId,
        blocks
    );
}

export function clearPlayerBlocks(
    playerId
) {
    playerBlocks.delete(
        playerId
    );
}

/**
 * ===============================
 * Glow Cache
 * ===============================
 */

export function getBlockKey(
    dimension,
    x,
    y,
    z
) {
    return `${dimension}:${x}:${y}:${z}`;
}

export function hasGlow(
    key
) {
    return glowCache.has(key);
}

export function getGlow(
    key
) {
    return glowCache.get(key);
}

export function setGlow(
    key,
    entity
) {
    glowCache.set(
        key,
        entity
    );
}

export function deleteGlow(
    key
) {
    glowCache.delete(
        key
    );
}

export function clearGlowCache() {
    glowCache.clear();
}

/**
 * ===============================
 * Remove Queue
 * ===============================
 */

export function queueRemove(
    key
) {
    removeQueue.push(
        key
    );
}

export function getRemoveQueue() {
    return removeQueue;
}

export function popRemoveQueue() {
    return removeQueue.shift();
}

/**
 * ===============================
 * Cleanup
 * ===============================
 */

export function clearPlayerCache(
    playerId
) {
    playerChunks.delete(
        playerId
    );

    playerBlocks.delete(
        playerId
    );
}

export function clearAllCache() {

    chunkCache.clear();

    glowCache.clear();

    playerChunks.clear();

    playerBlocks.clear();

    removeQueue.length = 0;

}

/**
 * ===============================
 * Debug
 * ===============================
 */

export function getCacheStats() {

    return {
        chunks: chunkCache.size,
        glows: glowCache.size,
        players: playerChunks.size,
        queuedRemovals: removeQueue.length
    };

}