import { showMainMenu } from "./menus/mainMenu.js";
import { showOreMenu } from "./menus/oreMenu.js";
import { showScannerMenu } from "./menus/scannerMenu.js";
import { showSupportMenu } from "./menus/supportMenu.js";
import { showChangelogMenu } from "./menus/changelogMenu.js";

/**
 * Buka Main Menu.
 */
export function openMainMenu(player) {

    showMainMenu(player);

}

/**
 * Buka Ore Menu.
 */
export function openOreMenu(player) {

    showOreMenu(player);

}

/**
 * Buka Scanner Menu.
 */
export function openScannerMenu(player) {

    showScannerMenu(player);

}

/**
 * Buka Support Menu.
 */
export function openSupportMenu(player) {

    showSupportMenu(player);

}

/**
 * Buka Changelog.
 */
export function openChangelogMenu(player) {

    showChangelogMenu(player);

}