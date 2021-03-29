#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clear = require("clear");
var figlet = __importStar(require("figlet"));
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = require("commander");
var package_info_util_1 = require("./utils/package-info.util");
var build_theme_util_1 = require("./utils/build-theme.util");
// clears command line every time cli is called.
clear();
console.log(chalk_1.default.blue(figlet.textSync("ns7-theme-builder", { horizontalLayout: "fitted" })));
commander_1.program
    .description(package_info_util_1.getDescription())
    .version(package_info_util_1.getVersion(), "-v, --version")
    .option("-b, --build-theme", "Builds nativescript theme.")
    .option("-p, --primary-color <color>", "Primary color. Can be in #hex or (r,g,b).")
    .option("-s, --secondary-color <color>", "Secondary color. Can be in #hex or (r,g,b).")
    .option("-a, --accent-color <color>", "Accent color. Can be in #hex or (r,g,b).")
    .option("-t, --text-color <color>", "Text color. Can be in #hex or (r,g,b).")
    .option("-h, --headline-color <color>", "Headline color. Can be in #hex or (r,g,b). Applied to h1-h6 classes.")
    .option("-e, --extra-colors <extras...>", "Pass extra colors to the theme. Please speficied the classes and properties to apply extra colors.");
commander_1.program
    .command("build")
    .alias("b")
    .description("Builds nativescript theme.")
    .action(function () {
    build_theme_util_1.buildTheme();
});
commander_1.program.parse(process.argv);
// * Build theme command
var options = commander_1.program.opts();
