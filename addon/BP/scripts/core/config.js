/**
 * Ore ESP Configuration
 */

export const CONFIG = {

    /**
     * Interval scanner.
     * (tick)
     */
    scanInterval: 10,

    /**
     * Radius horizontal.
     * (chunk)
     */
    chunkRadius: 3,

    minChunkRadius: 3,

    maxChunkRadius: 7,

    /**
     * Radius vertikal.
     * (block)
     *
     * 32 = ±2 chunk
     * 48 = ±3 chunk
     */
    verticalRadius: 32,

    minVerticalRadius: 32,

    maxVerticalRadius: 48,

    /**
     * Maksimum glow entity
     * yang boleh aktif.
     */
    maxGlowEntities: 600,

    /**
     * Player harus bergerak
     * minimal sekian block
     * sebelum scan ulang.
     */
    moveThreshold: 2,

    /**
     * Hapus cache ketika
     * pindah dimensi.
     */
    clearOnDimensionChange: true,

    /**
     * Maksimal chunk
     * diproses tiap tick.
     */
    scanPerTick: 2,

    /**
     * Cache chunk disimpan
     * berapa tick.
     *
     * 20 * 60 = 60 detik
     */
    chunkCacheTime: 20 * 60,

    /**
     * Maksimal glow
     * dihapus tiap tick.
     */
    removePerTick: 50

};