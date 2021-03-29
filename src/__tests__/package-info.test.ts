import { getVersion, getDescription } from './../utils/package-info.util';

test('Packge Info Util Test -- getVersion function', () => {
  expect(getVersion()).toEqual(`${String.fromCodePoint(0x1f4e6)}Version: ${'0.0.1'}`);
});

test('Packge Info Util Test -- getDescription function', () => {
  expect(getDescription()).toEqual(`${String.fromCodePoint(0x1f4e6)}Description: ${'Nativescript 7 theme builder'}`);
});
