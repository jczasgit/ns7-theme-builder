import { colorUtility, rgb2Hex, rgb2Hsv, hex2Rgb, alphaUtility, hsv2Rgb, hsl2Rgb, rgb2Hsl } from './../utils/build-theme.util';

test('Test colorUtility', () => {
  const result = colorUtility('#6699CC', 0.2);
  expect(result).toEqual('#7ab8f5');
});

test('Test colorUtility', () => {
  const result = colorUtility('#6699CC', 0);
  expect(result).toEqual('#6699cc');
});

test('Test colorUtility', () => {
  const result = colorUtility('#6699CC', -0.5);
  expect(result).toEqual('#334d66');
});

test('Test colorUtility', () => {
  const result = colorUtility('#000', 1);
  expect(result).toEqual('#000000');
});

test('Test colorUtility', () => {
  const result = colorUtility('#fff', -0.05);
  expect(result).toEqual('#f2f2f2');
});

test('Test colorUtility', () => {
  const result = colorUtility('#fff', -0.1);
  expect(result).toEqual('#e6e6e6');
});

test('Test colorUtility', () => {
  const result = colorUtility('#fff', -0.2);
  expect(result).toEqual('#cccccc');
});

test('Test rgb2Hex', () => {
  const result = rgb2Hex(252, 186, 3);
  expect(result).toEqual('#fcba03');
});

test('Test rgb2Hex', () => {
  const result = rgb2Hex(3, 252, 223);
  expect(result).toEqual('#03fcdf');
});

test('Test rgb2Hsv', () => {
  const result = rgb2Hsv(255, 255, 255);
  expect(result).toEqual([0, 0, 1]);
});

test('Test rgb2Hsv', () => {
  const result = rgb2Hsv(127, 90, 240);
  expect(result).toEqual([0.708, 0.625, 0.941]);
});

test('Test rgb2Hsv', () => {
  const result = rgb2Hsv(121, 93, 236);
  expect(result).toEqual([0.699, 0.606, 0.925]);
});

test('Test hex2Rgb', () => {
  const result = hex2Rgb('#795DEC');
  expect(result).toEqual({ r: 121, g: 93, b: 236 });
});

test('Test alphaUtility', () => {
  const result = alphaUtility('5c687c', 0.8);
  expect(result).toEqual('#5c687ccc');
});

test('Test hsv2Rgb', () => {
  const result = hsv2Rgb(0.699, 0.606, 0.925);
  expect(result).toEqual({ r: 121, g: 93, b: 236 });
});

test("Test rgb2Hsl", () => {
  const result = rgb2Hsl(23, 55, 23);
  expect(result.h).toEqual(120/360);
});

test("Test hsl2Rgb", () => {
  const result = hsl2Rgb({h: 120/360, s: 0.41, l: 0.1529});
  expect(result).toEqual({r: 23, g: 55, b: 23})
});
