"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = exports.getVersion = void 0;
var package_info_json_1 = require("../json/package-info.json");
function getVersion() {
    return String.fromCodePoint(0x1f4e6) + "Version: " + package_info_json_1.version;
}
exports.getVersion = getVersion;
function getDescription() {
    return String.fromCodePoint(0x1f4e6) + "Description: " + package_info_json_1.description;
}
exports.getDescription = getDescription;
