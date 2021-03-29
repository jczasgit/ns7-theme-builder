"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round = void 0;
/**
 * Round a number to certain decimal places.
 * Default is set to 0.
 * Code referenced from:
 * https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
 * @param value - float or int to round up.
 * @param decimals - decimals places to keep, default 0.
 * @returns The rounded number.
 */
function round(value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    var m = Math.pow(10, decimals);
    return Math.round(value * m) / m;
}
exports.round = round;
