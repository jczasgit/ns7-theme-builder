#!/usr/bin/env node
const clear = require("clear");
import * as figlet from "figlet";
import chalk from "chalk";
import { program } from "commander";
import { getVersion, getDescription } from "./utils/package-info.util";
import { buildTheme } from "./utils/build-theme.util";

// clears command line every time cli is called.
clear();

console.log(
    chalk.blue(
        figlet.textSync("ns7-theme-builder", {horizontalLayout: "fitted"})
    )
);

program
    .description(getDescription())
    .version(getVersion(), "-v, --version")

program
    .command("build")
    .alias("b")
    .description("Builds nativescript theme.")
    .action(() => {
        buildTheme();
    });

program.parse(process.argv);

