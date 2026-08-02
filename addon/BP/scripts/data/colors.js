/**
 * Color Registry
 *
 * index harus sama dengan
 * Array.textures di render_controller.
 */

export const COLORS = [

    {
        id: "white",
        name: "White",
        index: 0
    },

    {
        id: "lime",
        name: "Lime",
        index: 1
    },

    {
        id: "orange",
        name: "Orange",
        index: 2
    },

    {
        id: "light_gray",
        name: "Light Gray",
        index: 3
    },

    {
        id: "yellow",
        name: "Yellow",
        index: 4
    },

    {
        id: "aqua",
        name: "Aqua",
        index: 5
    },

    {
        id: "blue",
        name: "Blue",
        index: 6
    },

    {
        id: "red",
        name: "Red",
        index: 7
    },

    {
        id: "black",
        name: "Black",
        index: 8
    },

    {
        id: "brown",
        name: "Brown",
        index: 9
    },

    {
        id: "test",
        name: "Test",
        index: 10
    }

];

/**
 * Ambil color berdasarkan index.
 */
export function getColorByIndex(
    index
) {

    return COLORS.find(
        color => color.index === index
    ) ?? null;

}

/**
 * Ambil color berdasarkan id.
 */
export function getColorById(
    id
) {

    return COLORS.find(
        color => color.id === id
    ) ?? null;

}

/**
 * Ambil nama color.
 */
export function getColorName(
    index
) {

    return (
        getColorByIndex(index)?.name ??
        "Unknown"
    );

}

/**
 * Validasi index.
 */
export function isValidColor(
    index
) {

    return (
        index >= 0 &&
        index < COLORS.length
    );

}

/**
 * Clamp index.
 */
export function clampColorIndex(
    index
) {

    if (index < 0)
        return 0;

    if (index >= COLORS.length)
        return COLORS.length - 1;

    return index;

}