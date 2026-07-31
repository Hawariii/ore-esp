const DEFAULT_SETTINGS = {
    enabled: false,

    // Radius scan
    horizontalChunks: 3,
    verticalChunks: 2,

    // 0 = Box
    // 1 = Ore
    // 2 = Outline
    style: 0,

    ores: {
        diamond: true,
        emerald: true,
        ancient_debris: true,

        gold: false,
        iron: false,
        coal: false,
        copper: false,
        lapis: false,
        redstone: false,
        quartz: false,
        nether_gold: false,
    },
};

const players = new Map();

/**
 * Ambil data player.
 * Jika belum ada maka dibuat otomatis.
 * @param {string} playerId
 */
export function getPlayerData(playerId) {
    if (!players.has(playerId)) {
        players.set(playerId, structuredClone(DEFAULT_SETTINGS));
    }

    return players.get(playerId);
}

/**
 * Hapus data player.
 * @param {string} playerId
 */
export function removePlayerData(playerId) {
    players.delete(playerId);
}

/**
 * Ambil semua player data.
 */
export function getAllPlayerData() {
    return players;
}