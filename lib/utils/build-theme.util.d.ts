export declare type HUE = [h: number, s: number, v: number];
export declare type RGB = {
    r: number;
    g: number;
    b: number;
};
declare function rgb2Hsv(r: number, g: number, b: number): HUE;
/**
 * Convert HSV into RGB.
 * Referenced from :
 * https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 * @param h - Hue value [0, 1].
 * @param s - Saturation [0,1].
 * @param v - Value [0,1].
 * @returns - Object with r, g, b values.
 */
declare function hsv2Rgb(h: number, s: number, v: number): RGB;
declare function hex2Rgb(hex: string): RGB;
declare function rgb2Hex(r: number, g: number, b: number): string;
/**
 * Lightens / darkens a hexadeciaml color.
 * @param color - Hexadecimal color
 * @param lum - [-1,1] range, -1 being darkest, and 1 brightest.
 * @returns new hexadecimal color.
 */
declare function colorUtility(color: string, lum: number): string;
/**
 * Applies "transparency" to the hexadecimal color.
 * @param color - hexadecimal color.
 * @param alpha - alpha value of the color. [0,1] range.
 * @returns a hexadecimal color of length 8 => #RRGGBBAA.
 */
declare function alphaUtility(color: string, alpha: number): string;
/**
 * Ask for the necessary colors from the user and prepare theme.
 */
declare function buildTheme(): void;
export { buildTheme, rgb2Hex, colorUtility, rgb2Hsv, hex2Rgb, alphaUtility, hsv2Rgb };
