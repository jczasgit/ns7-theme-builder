import { 
    version,
    description } from "../json/package-info.json";

function getVersion(): string {
    return `${String.fromCodePoint(0x1F4E6)}Version: ${version}`;
}

function getDescription(): string {
    return `${String.fromCodePoint(0x1F4E6)}Description: ${description}`;
}

export { getVersion, getDescription }