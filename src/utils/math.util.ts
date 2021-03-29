/**
 * Round a number to certain decimal places.
 * Default is set to 0.
 * Code referenced from:
 * https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
 * @param value - float or int to round up.
 * @param decimals - decimals places to keep, default 0.
 * @returns The rounded number.
 */
function round(value: number, decimals: number = 0): number {
  let m = Math.pow(10, decimals);
  return Math.round(value * m) / m;
}

export { round };
