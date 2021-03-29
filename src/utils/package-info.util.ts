import { version, description, buildCode } from "./../json/version.json";

function getVersion(): string {
  return `${String.fromCodePoint(0x1f4e6)}Version: ${version}, Build-Code: ${buildCode}`;
}

function getDescription(): string {
  return `${String.fromCodePoint(0x1f4e6)}Description: ${description}`;
}

export { getVersion, getDescription };
