export const CONFIG = {
    // Interval scanner (tick)
    scanInterval: 10,

    // Radius horizontal (chunk)
    minHorizontalChunks: 3,
    maxHorizontalChunks: 7,
    defaultHorizontalChunks: 3,

    // Radius vertical (chunk)
    minVerticalChunks: 2,
    maxVerticalChunks: 3,
    defaultVerticalChunks: 2,

    // Maksimum glow entity per player
    maxGlowEntities: 600,

    // Jarak minimum player harus bergerak
    // sebelum scan ulang.
    moveThreshold: 2,

    // Jika player teleport / pindah dimensi
    // cache akan langsung dibersihkan.
    clearOnDimensionChange: true,
};