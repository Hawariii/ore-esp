/**
 * Header semua menu.
 */
export function getHeader(
    title = "ORE ESP"
) {

    return [
        "━━━━━━━━━━━━━━━━━━━━━━",
        `        ⛏ ${title}`,
        "━━━━━━━━━━━━━━━━━━━━━━",
        ""
    ].join("\n");

}