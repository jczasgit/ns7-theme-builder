import { version, description } from "./../../package.json";

function getVersion(): string {
  return `${String.fromCodePoint(0x1f4e6)}Version: ${version}`;
}

function getDescription(): string {
  return `${String.fromCodePoint(0x1f4e6)}Description: ${description}`;
}

export { getVersion, getDescription };
