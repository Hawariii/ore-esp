/**
 * Mengubah lokasi block menjadi key.
 * Contoh:
 * 10,64,-5
 *
 * @param {{x:number,y:number,z:number}} location
 * @returns {string}
 */
export function locationToKey(location) {
    return `${location.x},${location.y},${location.z}`;
}

/**
 * Chunk -> radius block.
 * Contoh:
 * 3 chunk = 48 block
 * 7 chunk = 112 block
 *
 * @param {number} chunks
 */
export function chunkToBlockRadius(chunks) {
    return chunks * 16;
}

/**
 * Mengembalikan titik tengah block.
 *
 * @param {{x:number,y:number,z:number}} location
 */
export function centerLocation(location) {
    return {
        x: location.x + 0.5,
        y: location.y + 0.5,
        z: location.z + 0.5,
    };
}

/**
 * Distance tanpa sqrt.
 * Jauh lebih cepat dibanding Math.sqrt().
 *
 * @param {{x:number,y:number,z:number}} a
 * @param {{x:number,y:number,z:number}} b
 */
export function distanceSquared(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;

    return dx * dx + dy * dy + dz * dz;
}

/**
 * Mengecek apakah player sudah bergerak cukup jauh.
 *
 * @param {{x:number,y:number,z:number}|null} previous
 * @param {{x:number,y:number,z:number}} current
 * @param {number} threshold
 */
export function isPlayerMovedEnough(previous, current, threshold) {
    if (!previous) return true;

    const thresholdSquared = threshold * threshold;

    return (
        distanceSquared(previous, current) >= thresholdSquared
    );
}

/**
 * Clamp angka.
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * Membulatkan lokasi block.
 *
 * @param {{x:number,y:number,z:number}} location
 */
export function floorLocation(location) {
    return {
        x: Math.floor(location.x),
        y: Math.floor(location.y),
        z: Math.floor(location.z),
    };
}