/**
 * Ore ESP Utils
 */

/**
 * Lokasi -> string key.
 *
 * x,y,z
 */
export function locationToKey(location) {

    return `${location.x},${location.y},${location.z}`;

}

/**
 * Chunk -> block.
 *
 * 1 chunk = 16 block
 */
export function chunkToBlockRadius(chunks) {

    return chunks * 16;

}

/**
 * Tengah block.
 */
export function centerLocation(location) {

    return {
        x: location.x + 0.5,
        y: location.y + 0.5,
        z: location.z + 0.5
    };

}

/**
 * Distance²
 * Lebih cepat daripada Math.sqrt().
 */
export function distanceSquared(
    a,
    b
) {

    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;

    return (
        dx * dx +
        dy * dy +
        dz * dz
    );

}

/**
 * Player sudah bergerak?
 */
export function isPlayerMovedEnough(
    previous,
    current,
    threshold
) {

    if (!previous)
        return true;

    const limit =
        threshold * threshold;

    return (
        distanceSquared(
            previous,
            current
        ) >= limit
    );

}

/**
 * Clamp number.
 */
export function clamp(
    value,
    min,
    max
) {

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );

}

/**
 * Floor location.
 */
export function floorLocation(
    location
) {

    return {

        x: Math.floor(
            location.x
        ),

        y: Math.floor(
            location.y
        ),

        z: Math.floor(
            location.z
        )

    };

}

/**
 * World -> Chunk X/Z.
 */
export function worldToChunk(
    value
) {

    return Math.floor(
        value / 16
    );

}

/**
 * Chunk key.
 */
export function chunkKey(
    dimension,
    chunkX,
    chunkZ
) {

    return `${dimension}:${chunkX}:${chunkZ}`;

}

/**
 * Block key.
 */
export function blockKey(
    dimension,
    x,
    y,
    z
) {

    return `${dimension}:${x}:${y}:${z}`;

}

/**
 * Chunk distance².
 */
export function chunkDistanceSquared(
    ax,
    az,
    bx,
    bz
) {

    const dx = ax - bx;
    const dz = az - bz;

    return (
        dx * dx +
        dz * dz
    );

}

/**
 * World location -> Chunk.
 */
export function locationToChunk(
    location
) {

    return {

        x: worldToChunk(
            location.x
        ),

        z: worldToChunk(
            location.z
        )

    };

}

/**
 * Cek apakah block berada
 * di dalam chunk.
 */
export function isBlockInChunk(
    location,
    chunkX,
    chunkZ
) {

    return (

        worldToChunk(
            location.x
        ) === chunkX &&

        worldToChunk(
            location.z
        ) === chunkZ

    );

}