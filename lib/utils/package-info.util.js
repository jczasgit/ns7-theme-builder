"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = exports.getVersion = void 0;
var version_json_1 = require("./../json/version.json");
function getVersion() {
    return String.fromCodePoint(0x1f4e6) + "Version: " + version_json_1.version;
}
exports.getVersion = getVersion;
function getDescription() {
    return String.fromCodePoint(0x1f4e6) + "Description: " + version_json_1.description;
}
exports.getDescription = getDescription;
