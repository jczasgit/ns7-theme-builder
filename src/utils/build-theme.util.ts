import { prompt, QuestionCollection, Answers } from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import invert from "invert-color";
import { WriteStream } from "node:fs";
import _keyframes from "./../json/keyframes.json";
import _classes from "./../json/classes.json";
import { Theme } from "./../model/theme.model";
import { round } from "./../utils/math.util";
import { Classes } from "../model/classes.model";

export type HUE = [h: number, s: number, v: number];
export type RGB = { r: number, g: number, b: number };

/**
 * Builds the nativescript theme file.
 * @param theme - Theme object.
 */
async function _build(theme: Theme) {
    const filename: string = "custom.css";
    const writeStream: WriteStream = fs.createWriteStream(path.join(theme.destination, filename), { flags: "a", encoding: "utf-8" });
    try {
        const keyframes: any = JSON.parse(JSON.stringify(_keyframes));
        const classes: any = JSON.parse(JSON.stringify(_classes));

        // * Stamping product.
        console.log(chalk.bgHex("#3da9fc").white("Building Nativescript Theme..."));
        writeStream.write("/* Theme Generated With NS7-THEME-BUILDER */");
        writeStream.write("\n");

        // * Start...
        console.log(String.fromCodePoint(0x1F680), chalk.red("Working as fast as possible..."));

        await _writeKeyframes(writeStream, keyframes);

        // * Light Theme
        console.log(String.fromCodePoint(0x1F485), chalk.hex("#ff8ba7").visible("Applying makeup..."));
        await _writeButton(writeStream, classes, theme);
        await _writeActivityIndicator(writeStream, classes, theme);
        await _writeSegmentedBar(writeStream, classes, theme);
        await _writeProgress(writeStream, classes, theme);
        await _writeSlider(writeStream, classes, theme);
        await _writeSearchBar(writeStream, classes, theme);
        await _writeSwitch(writeStream, classes, theme);
        await _writeTabView(writeStream, classes, theme);
        await _writeTapStrip(writeStream, classes, theme);
        await _writeListView(writeStream, classes, theme);
        await _writeRadSideDrawer(writeStream, classes, theme);
        console.log(String.fromCodePoint(0x1F4A6), "Uff, almost done...");
        await _writeForm(writeStream, classes, theme);
        await _writeTextView(writeStream, classes, theme);
        await _writePropertyEditor(writeStream, classes, theme);
        await _writeRadAutoCompleteTextView(writeStream, classes, theme);
        await _writeRadDataForm(writeStream, classes, theme);
        await _writePickerPage(writeStream, classes, theme);
        await _writeDateTimePicker(writeStream, classes, theme);
        await _writeDataFormEditorLabel(writeStream, classes, theme);
        await _writeActionBar(writeStream, classes, theme);
        await _writeGlobalClasses(writeStream, theme);
        await _writeCommons(writeStream, theme);

        console.log(String.fromCodePoint(0x2728), chalk.yellowBright("Looking fabulous!"));
        console.log(String.fromCodePoint(0x1F933), chalk.cyan("Taking a selfie..."));
        console.log(String.fromCodePoint(0x1F389), chalk.green("All done!"), String.fromCodePoint(0x2728));
        writeStream.end();
    } catch (error) {
        console.log(String.fromCodePoint(0x1F4A3), chalk.red(error));
        writeStream.end();
    }
    return;
}

function _writeExtraColors(ws: WriteStream, t:Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("Setting extra color variables..."));
            const { extraColors } = t;
            for(let i=0;i<extraColors.length;i+=1) {
                await _write(ws, `--extra-${i}: ${extraColors[i]}; `);
            }
            resolve();
        } catch (error) {
            reject(`"Error setting extra color variables." ERROR: ${error}`);
        }
    });
}

function _writeGlobalClasses(ws: WriteStream, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("Setting global classes..."));
            await _write(ws , `.text-primary { color: ${t.light.accent}; } \n`);
            await _write(ws , `.ns-dark .text-primary { color: ${t.dark.accent}; } \n`);
            await _write(ws , `.text-danger { color: ${t.common.error}; } \n`);
            await _write(ws , `.bg-primary { color: ${t.light.background}; background-color: ${t.light.accent}; } \n`);
            await _write(ws , `.ns-dark .bg-primary { color: ${t.dark.background}; background-color: ${t.dark.accent}; } \n`);
            await _write(ws , `.bg-danger { color: ${t.common.white}; background-color: ${t.common.error}; } \n`);
            await _write(ws , `.img-rounded { border-radius: ${t.common.borderRadiusSm}; } \n`);
            await _write(ws , `.img-circle { border-radius: ${t.common.borderRadiusLg}; } \n`);
            await _write(ws , `.hr { border-color: #d9d9d9; } \n`);
            await _write(ws , `.ns-dark .hr { border-color: #4d4d4d; } \n`);
            await _write(ws , `.hr-light { border-color: #919bad; } \n`);
            await _write(ws , `.ns-dark .hr-light { border-color: #e9ebee; } \n`);
            await _write(ws , `.ns-dark .hr-dark { border-color: #aeb6c3; } \n`);
            await _write(ws , `.hr-dark { border-color: #313741; } \n`);
            resolve();
        } catch (error) {
            reject(`"Error setting global classes." ERROR: ${error}`);
        }
    });
}

function _writeCommons(ws: WriteStream, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("Setting common variables..."));
            await _write(ws, ".ns-root, .ns-modal { ");
            const entries = Object.entries(t.common);
            for(let [key, value] of entries) {
                key = key.replace(/([A-Z])/g, " $1").toLowerCase().replace(/\s/g, "-");
                await _write(ws, `--${key}: ${value}; `);
            }
            await _writeExtraColors(ws, t);
            await _write(ws, "} \n");
            resolve();
        } catch (error) {
            reject(`"Error setting common variables." ERROR: ${error}`);
        }
    });
}

function _writeActionBar(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("ActionBar..."));
            const classes = Object.keys(c.light.ActionBar);
            for(let _class of classes) {
                let line = `${_class} { `;
                for(let _property of c.light.ActionBar[_class]) {
                    switch (_property) {
                        case "color":
                            line += `color: ${t.light.complementaryColor}; `;
                            break;
                        case "background-color":
                            if (/\.nt-action-bar__item/g.test(_class)) line += `background-color: ${t.common.transparent}; `;
                            else line += `background-color: ${t.light.complementary}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            const dark_classes = Object.keys(c.dark.ActionBar);
            for(let _class of dark_classes) {
                let line = `${_class} { `;
                for(let _property of c.dark.ActionBar[_class]) {
                    switch (_property) {
                        case "color":
                            line += `color: ${t.dark.complementaryColor}; `;
                            break;
                        case "background-color":
                            if (/\.nt-action-bar__item/g.test(_class)) line += `background-color: ${t.common.transparent}; `;
                            else line += `background-color: ${t.dark.complementary}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying ActionBar theme." ERROR: ${error}`);
        }
    });
}

function _writeDataFormEditorLabel(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("DataFormEditorLabel..."));
            const light_class = Object.keys(c.light.DataFormEditorLabel)[0];
            const dark_class = Object.keys(c.dark.DataFormEditorLabel)[0];
            await _write(ws, `${light_class} { color: ${colorUtility(t.light.textColor, -0.1)}; } \n`);
            await _write(ws, `${dark_class} { color: ${colorUtility(t.dark.textColor, -0.1)}; } \n`);
            resolve();
        } catch (error) {
            reject(`"Error applying DataFormEditorLabel theme." ERROR: ${error}`);
        }
    });
}

function _writeDateTimePicker(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("DateTimePicker..."));
            const classes = Object.keys(c.light.DateTimePicker);
            for(let _class of classes) {
                let line = `${_class} { `;
                for(let _property of c.light.DateTimePicker[_class]) {
                    switch (_property) {
                        case "color":
                            if (/\bbuttons\b/.test(_class)) line += `color: ${colorUtility(t.light.textColor, -0.2)}; `;
                            else if(/\bspinners\b/.test(_class)) line += `color: ${colorUtility(t.light.textColor, -0.1)}; `;
                            else line += `color: ${t.light.textColor}; `;
                            break;
                        case "background":
                            line += `background: ${t.light.background}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            const dark_classes = Object.keys(c.dark.DateTimePicker);
            for(let _class of dark_classes) {
                let line = `${_class} { `;
                for(let _property of c.dark.DateTimePicker[_class]) {
                    switch (_property) {
                        case "color":
                            if (/\bbuttons\b/.test(_class)) line += `color: ${colorUtility(t.dark.textColor, -0.2)}; `;
                            else if(/\bspinners\b/.test(_class)) line += `color: ${colorUtility(t.dark.textColor, -0.1)}; `;
                            else line += `color: ${t.dark.textColor}; `;
                            break;
                        case "background":
                            line += `background: ${t.dark.background}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying DateTimePicker theme." ERROR: ${error}`);
        }
    });
}

function _writePickerPage(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("PickerPage..."));
            const classes = Object.keys(c.light.PickerPage);
            for(let _class of classes) {
                let line = `${_class} { `;
                for(let _property of c.light.PickerPage[_class]) {
                    switch (_property) {
                        case "color":
                            line += `color: ${t.light.textColor}; `;
                            break;
                        case "background":
                            line += `background: ${t.light.background}; `;
                            break;
                        case "border-bottom-color":
                            line += `border-bottom-color: ${t.light.primaryAccent}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            const dark_classes = Object.keys(c.dark.PickerPage);
            for(let _class of dark_classes) {
                let line = `${_class} { `;
                for(let _property of c.dark.PickerPage[_class]) {
                    switch (_property) {
                        case "color":
                            line += `color: ${t.dark.textColor}; `;
                            break;
                        case "background":
                            line += `background: ${t.dark.background}; `;
                            break;
                        case "border-bottom-color":
                            line += `border-bottom-color: ${t.dark.primaryAccent}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying PickerPage theme." ERROR: ${error}`);
        }
    });
}

function _writeRadDataForm(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("RadDataForm..."));
            const classes = Object.keys(c.light.RadDataForm);
            for(let _class of classes) {
                let line = `${_class} { `;
                for(let _property of c.light.RadDataForm[_class]) {
                    switch (_property) {
                        case "color":
                            line += `color: ${t.light.textColor}; `;
                            break;
                        case "background-color":
                            line += `background-color: ${t.light.background}; `;
                            break;
                        case "placeholder-color":
                            line += `placeholder-color: ${t.common.greyLight}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            const dark_classes = Object.keys(c.dark.RadDataForm);
            for(let _class of dark_classes) {
                let line = `${_class} { `;
                for(let _property of c.dark.RadDataForm[_class]) {
                    switch (_property) {
                        case "color":
                            line += `color: ${t.dark.textColor}; `;
                            break;
                        case "background-color":
                            line += `background-color: ${t.dark.background}; `;
                            break;
                        case "placeholder-color":
                            line += `placeholder-color: ${t.common.greyLight}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying RadDataForm theme." ERROR: ${error}`);
        }
    })
}

function _writeRadAutoCompleteTextView(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("RadAutoCompleteTextView..."));
            const classes = Object.keys(c.light.RadAutoCompleteTextView);
            for(let _class of classes) {
                let line = `${_class} { `;
                for(let _property of c.light.RadAutoCompleteTextView[_class]) {
                    switch (_property) {
                        case "background-color":
                            if (/\:selected/gi.test(_class)) line += `background-color: ${t.light.accentLight}; `;
                            else if(/SuggestionView/g.test(_class)) line += `background-color: ${t.light.background}; `;
                            else line += `background-color: ${t.light.accentDark}; `;
                            break;
                        case "color":
                            if (/ClearButton/g.test(_class)) line += `color: ${t.light.accent}; `;
                            else line += `color: ${t.light.textColor}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }

            const dark_classes = Object.keys(c.dark.RadAutoCompleteTextView);
            for(let _class of dark_classes) {
                let line = `${_class} { `;
                for(let _property of c.dark.RadAutoCompleteTextView[_class]) {
                    switch (_property) {
                        case "background-color":
                            if (/\:selected/gi.test(_class)) line += `background-color: ${t.dark.accentLight}; `;
                            else if(/SuggestionView/g.test(_class)) line += `background-color: ${t.dark.background}; `;
                            else line += `background-color: ${t.dark.accentDark}; `;
                            break;
                        case "color":
                            if (/ClearButton/g.test(_class)) line += `color: ${t.dark.accent}; `;
                            else line += `color: ${t.dark.textColor}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying RadAutoCompleteTextView theme." ERROR: ${error}`);
        }
    });
}

function _writePropertyEditor(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("PropertyEditor..."));
            const light_class: string = Object.keys(c.light.PropertyEditor)[0];
            const dark_class: string = Object.keys(c.dark.PropertyEditor)[0];
            await _write(ws, `${light_class} { border-color: ${t.light.accentDark}; } \n`);
            await _write(ws, `${dark_class} { border-color: ${t.dark.accentDark}; } \n`);
            resolve();
        } catch (error) {
            reject(`"Error applying PropertyEditor theme." ERROR: ${error}`);
        }
    });
}

function _writeTextView(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("TextView..."));
            const classes: string[] = Object.keys(c.light.TextView);
            for (let i = 0; i < classes.length; i += 1) {
                let line = `${classes[i]} { `;
                for (let j = 0; j < c.light.TextView[classes[i]].length; j += 1) {
                    switch (c.light.TextView[classes[i]][j]) {
                        case "background-color":
                            if (/\[isEnabled=false\]/gi.test(classes[i])) line += `background-color: ${t.light.backgroundAlt5}; `;
                            else line += `background-color: ${t.common.transparent}; `;
                            break;
                        case "color":
                            if (/\[isEnabled=false\]/gi.test(classes[i])) line += `color: ${t.light.disabledColor}; `;
                            else line += `color: ${t.light.background}; `;
                            break;
                        case "placeholder-color":
                            line += `placeholder-color: ${t.common.greyLight}; `;
                            break;
                        case "border-color":
                            if (/\:focus/gi.test(classes[i])) line += `border-color: ${t.light.accentDark}; `;
                            else line += `border-color: ${t.light.backgroundAlt5}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }

            const dark_classes: string[] = Object.keys(c.dark.TextView);
            for (let i = 0; i < dark_classes.length; i += 1) {
                let line = `${dark_classes[i]} { `;
                for (let j = 0; j < c.dark.TextView[dark_classes[i]].length; j += 1) {
                    switch (c.dark.TextView[dark_classes[i]][j]) {
                        case "background-color":
                            if (/\[isEnabled=false\]/gi.test(dark_classes[i])) line += `background-color: ${t.dark.backgroundAlt5}; `;
                            else line += `background-color: ${t.common.transparent}; `;
                            break;
                        case "color":
                            if (/\[isEnabled=false\]/gi.test(dark_classes[i])) line += `color: ${t.dark.disabledColor}; `;
                            else line += `color: ${t.dark.background}; `;
                            break;
                        case "placeholder-color":
                            line += `placeholder-color: ${t.common.greyDark}; `;
                            break;
                        case "border-color":
                            if (/\:focus/gi.test(dark_classes[i])) line += `border-color: ${t.dark.accentDark}; `;
                            else line += `border-color: ${t.dark.backgroundAlt5}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying TextView theme." ERROR: ${error}`);
        }
    });
}

function _writeForm(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("Form..."));
            const classes: string[] = Object.keys(c.light.Form);
            for (let i = 0; i < classes.length; i += 1) {
                let line = `${classes[i]} { `;
                for (let j = 0; j < c.light.Form[classes[i]].length; j += 1) {
                    switch (c.light.Form[classes[i]][j]) {
                        case "font-size":
                            line += `font-size: ${t.common.btnFontSize}; `;
                            break;
                        case "color":
                            if (/\.nt-form__validation-message/gi.test(classes[i])) line += `color: ${t.common.error}; `;
                            else line += `color: ${t.light.accent}; `;
                            break;
                        case "opacity":
                            line += `opacity: ${t.common.disabledOpacity}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }

            // * dark theme
            const dark_class: string = Object.keys(c.dark.Form)[0];
            await _write(ws, `${dark_class} { color: ${t.dark.accent}; } \n`);

            resolve();
        } catch (error) {
            reject(`"Error applying From theme." ERROR: ${error}`);
        }
    });
}

function _writeRadSideDrawer(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("RadSideDrawer..."));
            const classes: string[] = Object.keys(c.light.RadSideDrawer);
            for (let i = 0; i < classes.length; i += 1) {
                let line = `${classes[i]} { `;
                for (let j = 0; j < c.light.RadSideDrawer[classes[i]].length; j += 1) {
                    switch (c.light.RadSideDrawer[classes[i]][j]) {
                        case "color":
                            if (/\.nt-drawer__header/gi.test(classes[i])) line += `color: ${t.light.complementaryColor}; `;
                            else line += `color: ${t.light.accentDark}; `;
                            break;
                        case "background-color":
                            if (/\.nt-drawer__header/gi.test(classes[i])) line += `background-color: ${t.light.complementaryDark}; `;
                            else if (/\.nt-drawer__content/gi.test(classes[i])) line += `background-color: ${t.light.background}; `;
                            else line += `background-color: ${t.light.backgroundDarkAccent}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            // * dark theme
            const dark_classes: string[] = Object.keys(c.dark.RadSideDrawer);
            for (let i = 0; i < dark_classes.length; i += 1) {
                let line = `${dark_classes[i]} { `;
                for (let j = 0; j < c.dark.RadSideDrawer[dark_classes[i]].length; j += 1) {
                    switch (c.dark.RadSideDrawer[dark_classes[i]][j]) {
                        case "color":
                            if (/\.nt-drawer__header/gi.test(dark_classes[i])) line += `color: ${t.dark.complementaryColor}; `;
                            else line += `color: ${t.dark.accentDark}; `;
                            break;
                        case "background-color":
                            if (/\.nt-drawer__header/gi.test(dark_classes[i])) line += `background-color: ${t.dark.complementaryDark}; `;
                            else if (/\.nt-drawer__content/gi.test(dark_classes[i])) line += `background-color: ${t.dark.background}; `;
                            else line += `background-color: ${t.dark.backgroundDarkAccent}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }

            resolve();
        } catch (error) {
            reject(`"Error applying RadSideDrawer theme." ERROR: ${error}`);
        }
    });
}

function _writeListView(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("ListView..."));
            const classes: string[] = Object.keys(c.light.ListView);
            for (let i = 0; i < classes.length; i += 1) {
                let line = `${classes[i]} { `;
                for (let j = 0; j < c.light.ListView[classes[i]].length; j += 1) {
                    switch (c.light.ListView[classes[i]][j]) {
                        case "item-selected-background-color":
                            line += `item-selected-background-color: ${t.light.backgroundDarkAccent}; `;
                            break;
                        case "separator-color":
                            line += `separator-color: ${t.light.backgroundAlt20}; `;
                            break;
                        case "background-color":
                            if (/\*\.active/gi.test(classes[i])) line += `background-color: ${t.light.backgroundAlt20}; `;
                            else line += `background-color: ${t.common.error}; `;
                            break;
                        case "color":
                            line += `color: ${t.common.black}; `;
                            break;
                        case "border-bottom-color":
                            line += `border-bottom-color: ${t.light.accentLight}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }

            // * dark theme
            const dark_classes: string[] = Object.keys(c.dark.ListView);
            for (let i = 0; i < dark_classes.length; i += 1) {
                let line = `${dark_classes[i]} { `;
                for (let j = 0; j < c.dark.ListView[dark_classes[i]].length; j += 1) {
                    switch (c.dark.ListView[dark_classes[i]][j]) {
                        case "item-selected-background-color":
                            line += `item-selected-background-color: ${t.dark.backgroundDarkAccent}; `;
                            break;
                        case "separator-color":
                            line += `separator-color: ${t.dark.backgroundAlt20}; `;
                            break;
                        case "background-color":
                            if (/\*\.active/gi.test(classes[i])) line += `background-color: ${t.dark.backgroundAlt20}; `;
                            else line += `background-color: ${t.common.error}; `;
                            break;
                        case "color":
                            line += `color: ${t.common.black}; `;
                            break;
                        case "border-bottom-color":
                            line += `border-bottom-color: ${t.dark.accentLight}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying ListView theme." ERROR: ${error}`);
        }
    });
}

function _writeTapStrip(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("TabStrip..."));
            const classes: string[] = Object.keys(c.light.TabStrip);
            for (let i = 0; i < classes.length; i += 1) {
                let line = `${classes[i]} { `;
                for (let j = 0; j < c.light.TabStrip[classes[i]].length; j += 1) {
                    switch (c.light.TabStrip[classes[i]][j]) {
                        case "highlight-color":
                            line += `highlight-color: ${t.light.accent}; `;
                            break;
                        case "background":
                            line += `background: ${t.light.backgroundAlt5}; `;
                            break;
                        case "color":
                            if (/\b:active\b/gi.test(classes[i])) line += `color: ${t.light.accent}; `;
                            else line += `color: ${t.light.headingsColor}; `;
                            break;
                        case "background":
                            line += `background: ${t.light.background}`;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            // * dark theme.
            const dark_classes: string[] = Object.keys(c.dark.TabStrip);
            for (let i = 0; i < dark_classes.length; i += 1) {
                let line = `${dark_classes[i]} { `;
                for (let j = 0; j < c.dark.TabStrip[dark_classes[i]].length; j += 1) {
                    switch (c.dark.TabStrip[dark_classes[i]][j]) {
                        case "highlight-color":
                            line += `highlight-color: ${t.dark.accent}; `;
                            break;
                        case "background":
                            line += `background: ${t.dark.backgroundAlt5}; `;
                            break;
                        case "color":
                            if (/\b:active\b/gi.test(dark_classes[i])) line += `color: ${t.light.accent}; `;
                            else line += `color: ${t.dark.headingsColor}; `;
                            break;
                        case "background":
                            line += `background: ${t.dark.background}`;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying TabView theme." ERROR: ${error}`);
        }
    });
}

function _writeTabView(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("TabView..."));
            const classes: string[] = Object.keys(c.light.TabView);
            for (let i = 0; i < classes.length; i += 1) {
                let line = `${classes[i]} { `;
                for (let j = 0; j < c.light.TabView[classes[i]].length; j += 1) {
                    switch (c.light.TabView[classes[i]][j]) {
                        case "selected-tab-text-color":
                            line += `selected-tab-text-color: ${t.light.accent}; `;
                            break;
                        case "tab-background-color":
                            line += `tab-background-color: ${t.light.background}; `;
                            break;
                        case "tab-text-color":
                            line += `tab-text-color: ${t.light.tabTextColor}; `;
                            break;
                        case "android-selected-tab-highlight-color":
                            line += `android-selected-tab-highlight-color: ${t.light.accent}; `;
                            break;
                        default:
                            line = line + "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            // * Dark Theme
            const dark_classes: string[] = Object.keys(c.dark.TabView);
            for (let i = 0; i < dark_classes.length; i += 1) {
                let line = `${dark_classes[i]} { `;
                for (let j = 0; j < c.dark.TabView[dark_classes[i]].length; j += 1) {
                    switch (c.dark.TabView[dark_classes[i]][j]) {
                        case "selected-tab-text-color":
                            line += `selected-tab-text-color: ${t.dark.accent}; `;
                            break;
                        case "tab-background-color":
                            line += `tab-background-color: ${t.dark.background}; `;
                            break;
                        case "tab-text-color":
                            line += `tab-text-color: ${t.dark.tabTextColor}; `;
                            break;
                        case "android-selected-tab-highlight-color":
                            line += `android-selected-tab-highlight-color: ${t.dark.accent}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying TabView theme." ERROR: ${error}`);
        }
    });
}

function _writeSwitch(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("Switch..."));
            const classes: string[] = Object.keys(c.light.Switch);
            for (let i = 0; i < classes.length; i += 1) {
                let line = `${classes[i]} { `;
                for (let j = 0; j<c.light.Switch[classes[i]].length; j += 1) {
                    switch (c.light.Switch[classes[i]][j]) {
                        case "color":
                            if (/\[checked=true\]/gi.test(classes[i])) line += `color: ${t.light.accent}; `;
                            else if (/\[isEnabled=false\]/gi.test(classes[i])) line += `color: ${t.light.backgroundAlt10}; `;
                            else {
                                if (/\.ns-android/gi.test(classes[i])) line += `color: ${t.light.backgroundAlt20}; `;
                                else line += `color: ${t.light.background}; `;
                            }
                            break;
                        case "background-color":
                            if (/\.ns-android/gi.test(classes[i])) line += `background-color: ${t.light.backgroundAlt20}; `;
                            else line += `background-color: ${t.light.accent}; `;
                            break;
                        case "off-background-color":
                            line += `off-background-color: ${t.light.backgroundAlt10}; `;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            // * Dark Theme
            const dark_classes: string[] = Object.keys(c.dark.Switch);
            for (let i = 0; i < dark_classes.length; i += 1) {
                let line = `${dark_classes[i]} { `;
                for (let j = 0; j<c.dark.Switch[dark_classes[i]].length; j += 1) {
                    switch (c.dark.Switch[dark_classes[i]][j]) {
                        case "color":
                            if (/\[checked=true\]/gi.test(dark_classes[i])) line += `color: ${t.dark.accent}; `;
                            else if (/\[isEnabled=false\]/gi.test(dark_classes[i])) line += `color: ${t.dark.backgroundAlt10}; `;
                            else {
                                if (/\.ns-android/gi.test(dark_classes[i])) line += `color: ${t.dark.backgroundAlt20}; `;
                                else line += `color: ${t.dark.background}; `;
                            }
                            break;
                        case "background-color":
                            if (/\.ns-android/gi.test(dark_classes[i])) line += `background-color: ${t.dark.backgroundAlt20}; `;
                            else line += `background-color: ${t.dark.accent}; `;
                            break;
                        case "off-background-color":
                            line += `off-background-color: ${t.dark.backgroundAlt10}`;
                            break;
                        default:
                            line += "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying switch theme." ERROR: ${error}`);
        }
    });
}

function _writeSearchBar(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("SearchBar..."));
            const _class: string = Object.keys(c.light.SearchBar)[0];
            let line = `${_class} { `;
            for (let i = 0; i < c.light.SearchBar[_class].length; i += 1) {
                switch (c.light.SearchBar[_class][i]) {
                    case ("color"):
                        line = line + `color: ${t.light.headingsColor}; `;
                        break;
                    case ("background-color"):
                        line = line + `background-color: ${t.light.background}; `;
                    case ("text-field-hint-color"):
                        line = line + `text-field-hint-color: ${t.common.black}; `;
                        break;
                    case ("text-field-background-color"):
                        line = line + "text-field-background-color: transparent; ";
                        break;
                    default:
                        line = line + "} \n";
                        break;
                }
            }
            await _write(ws, line);

            const dark_class: string = Object.keys(c.dark.SearchBar)[0];
            line = `${dark_class} { `;
            for (let i = 0; i < c.dark.SearchBar[dark_class].length; i += 1) {
                switch (c.dark.SearchBar[dark_class][i]) {
                    case ("color"):
                        line = line + `color: ${t.dark.headingsColor}; `;
                        break;
                    case ("background-color"):
                        line = line + `background-color: ${t.dark.background}; `;
                    case ("text-field-hint-color"):
                        line = line + `text-field-hint-color: ${t.common.black}; `;
                        break;
                    case ("text-field-background-color"):
                        line = line + "text-field-background-color: transparent; ";
                        break;
                    default:
                        line = line + "} \n";
                        break;
                }
            }
            await _write(ws, line);
            resolve();
        } catch (error) {
            reject(`"Error applying search bar theme." ERROR: ${error}`);
        }
    });
}

/**
 * Write slider classes into theme css.
 * @param ws - writestream
 * @param c - classes
 * @param t - theme
 * @returns Promise resolves void.
 */
function _writeSlider(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("Slider..."));
            const classes: string[] = Object.keys(c.light.Slider);
            // \[isEnabled=false\]
            for (let i = 0; i < classes.length; i += 1) {
                let line = `${classes[i]} { `;
                let isEnabled = true;
                if (/\[isEnabled=false\]/.test(classes[i])) isEnabled = false;
                for (let j = 0; j < c.light.Slider[classes[i]].length; j += 1) {
                    switch (c.light.Slider[classes[i]][j]) {
                        case ("color"):
                            line = line + `color: ${isEnabled ? t.light.accent : "#e0e0e0"}; `;
                            break;
                        case ("background-color"):
                            line = line + `background-color: ${isEnabled ? t.light.accent : "#e0e0e0"}; `;
                            break;
                        default:
                            line = line + "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            const dark_classes: string[] = Object.keys(c.dark.Slider);
            // \[isEnabled=false\]
            for (let i = 0; i < dark_classes.length; i += 1) {
                let line = `${dark_classes[i]} { `;
                let isEnabled = true;
                if (/\[isEnabled=false\]/.test(dark_classes[i])) isEnabled = false;
                for (let j = 0; j < c.dark.Slider[dark_classes[i]].length; j += 1) {
                    switch (c.dark.Slider[dark_classes[i]][j]) {
                        case ("color"):
                            line = line + `color: ${isEnabled ? t.dark.accent : "#e0e0e0"}; `;
                            break;
                        case ("background-color"):
                            line = line + `background-color: ${isEnabled ? t.dark.accent : "#e0e0e0"}; `;
                            break;
                        default:
                            line = line + "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying slider theme." ERROR: ${error}`);
        }
    });
}

/**
 * Write progress classes into theme css.
 * @param ws - writestream
 * @param c - classes
 * @param t - theme
 * @returns Promise resolves void.
 */
function _writeProgress(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("Progress..."));
            const _class: string = Object.keys(c.light.Progress)[0];
            let line = `${_class} { `;
            for (let i = 0; i < c.light.Progress[_class].length; i += 1) {
                switch (c.light.Progress[_class][i]) {
                    case ("color"):
                        line = line + `color: ${t.light.accent}; `;
                        break;
                    case ("background-color"):
                        line = line + `background-color: ${t.light.backgroundAccent}; `;
                        break;
                    default:
                        line = line + "} \n";
                        break;
                }
            }
            await _write(ws, line);

            const dark_class: string = Object.keys(c.dark.Progress)[0];
            line = `${dark_class} { `;
            for (let i = 0; i < c.dark.Progress[dark_class].length; i += 1) {
                switch (c.dark.Progress[dark_class][i]) {
                    case ("color"):
                        line = line + `color: ${t.dark.accent}; `;
                        break;
                    case ("background-color"):
                        line = line + `background-color:  ${t.dark.backgroundAccent}; `;
                        break;
                    default:
                        line = line + "} \n";
                        break;
                }
            }
            await _write(ws, line);
            resolve();
        } catch (error) {
            reject(`"Error applying progress theme." ERROR: ${error}`);
        }
    });
}

function _writeSegmentedBar(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("SegmentedBar..."));
            const classes: string[] = Object.keys(c.light.SegmentedBar); // class names
            for (let i = 0; i < classes.length; i += 1) {
                let line = `${classes[i]} { `;
                for (let j = 0; j < c.light.SegmentedBar[classes[i]].length; j += 1) {
                    // add property for of each class
                    switch (c.light.SegmentedBar[classes[i]][j]) {
                        case ("color"):
                            line = line + `color: ${t.light.headingsColor}; `;
                            break;
                        case ("background-color"):
                            line = line + `background-color: ${t.light.background}; `;
                            break;
                        case ("selected-background-color"):
                            line = line + `selected-background-color: ${t.light.accent}; `;
                            break;
                        case ("margin"):
                            line = line + `margin: 0 15; `;
                            break;
                        default:
                            line = line + "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }

            const dark_classes: string[] = Object.keys(c.dark.SegmentedBar); // class names
            for (let i = 0; i < dark_classes.length; i += 1) {
                let line = `${dark_classes[i]} { `;
                for (let j = 0; j < c.dark.SegmentedBar[dark_classes[i]].length; j += 1) {
                    // add property for of each class
                    switch (c.dark.SegmentedBar[dark_classes[i]][j]) {
                        case ("color"):
                            line = line + `color: ${t.dark.headingsColor}; `;
                            break;
                        case ("background-color"):
                            line = line + `background-color: ${t.dark.background}; `;
                            break;
                        case ("selected-background-color"):
                            line = line + `selected-background-color: ${t.dark.accent}; `;
                            break;
                        case ("margin"):
                            line = line + `margin: 0 15; `;
                            break;
                        default:
                            line = line + "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying segmented bar theme." ERROR: ${error}`);
        }
    });
}

function _writeActivityIndicator(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("ActivityIndicator..."));
            const classes: string[] = Object.keys(c.light.ActivityIndicator);
            for (let i = 0; i < classes.length; i += 1) {
                let line = `${classes[i]} { `;
                for (let j = 0; j < c.light.ActivityIndicator[classes[i]].length; j += 1) {
                    switch (c.light.ActivityIndicator[classes[i]][j]) {
                        case ("color"):
                            line = line + `color: ${t.light.secondary}; `;
                            break;
                        default:
                            line = line + `} \n`;
                            break;
                    }
                }
                await _write(ws, line);
            }
            const dark_classes: string[] = Object.keys(c.dark.ActivityIndicator);
            for (let i = 0; i < dark_classes.length; i += 1) {
                let line = `${dark_classes[i]} { `;
                for (let j = 0; j < c.dark.ActivityIndicator[dark_classes[i]].length; j += 1) {
                    switch (c.dark.ActivityIndicator[dark_classes[i]][j]) {
                        case ("color"):
                            line = line + `color: ${t.dark.secondary}; `;
                            break;
                        default:
                            line = line + `} \n`;
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying activity indicator light theme." ERROR: ${error}`);
        }
    });
}

function _writeButton(ws: WriteStream, c: Classes, t: Theme): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(chalk.green("Button..."));
            const classes: string[] = Object.keys(c.light.Button);
            for (let i = 0; i < classes.length; i += 1) {
                let line: string = `${classes[i]} { `;
                let isOutlineButton = false;
                let isOutlineButtonActive = false;
                // test for outline:active \b\.-outline(\:active|\.-active)\b
                if (/\b\.-outline(\:active|\.-active)\b/.test(classes[i])) {
                    isOutlineButtonActive = true;
                }
                else if (/\b\.-outline\b/.test(classes[i])) {
                    // test for outline \b\.-outline\b
                    isOutlineButton = true;
                }
                for (let j = 0; j < c.light.Button[classes[i]].length; j += 1) {
                    switch (c.light.Button[classes[i]][j]) {
                        case ("background-color"):
                            let color;
                            if (isOutlineButton) color = "#fff";
                            else if (isOutlineButtonActive) color = "#f2f2f2";
                            else color = t.light.primary;
                            line = line + `background-color: ${color}; `;
                            break;
                        case ("color"):
                            line = line + `color: ${t.light.textColor}; `
                            break;
                        case ("animation"):
                            line = line + `animation: -hightlight-light .3s ease-out forwards; `;
                            break;
                        case ("border-color"):
                            line = line + `border-color: ${t.light.accent}; `;
                            break;
                        default:
                            line = line + "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            const dark_classes: string[] = Object.keys(c.dark.Button);
            for (let i = 0; i < dark_classes.length; i += 1) {
                let line: string = `${dark_classes[i]} { `;
                let isOutlineButton = false;
                let isOutlineButtonActive = false;
                // test for outline:active \b\.-outline(\:active|\.-active)\b
                if (/\b\.-outline(\:active|\.-active)\b/.test(dark_classes[i])) {
                    isOutlineButtonActive = true;
                }
                else if (/\b\.-outline\b/.test(dark_classes[i])) {
                    // test for outline \b\.-outline\b
                    isOutlineButton = true;
                }
                for (let j = 0; j < c.dark.Button[dark_classes[i]].length; j += 1) {
                    switch (c.dark.Button[dark_classes[i]][j]) {
                        case ("background-color"):
                            let color;
                            if (isOutlineButton) color = "#fff";
                            else if (isOutlineButtonActive) color = "#f2f2f2";
                            else color = t.dark.primary;
                            line = line + `background-color: ${color}; `;
                            break;
                        case ("color"):
                            line = line + `color: ${t.dark.textColor}; `
                            break;
                        case ("animation"):
                            line = line + `animation: -hightlight-light .3s ease-out forwards; `;
                            break;
                        case ("border-color"):
                            line = line + `border-color: ${t.dark.accent}; `;
                            break;
                        default:
                            line = line + "} \n";
                            break;
                    }
                }
                await _write(ws, line);
            }
            resolve();
        } catch (error) {
            reject(`"Error applying light theme colors to Button." ERROR: ${error}`);
        }
    });
}

function _writeKeyframes(ws: WriteStream, keyframes: any): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(String.fromCodePoint(0x1F3AC), chalk.blue("Adding animation keyframes..."));
            const names: string[] = Object.keys(keyframes);
            const prefix: string = "@keyframes";
            await _write(ws, `${prefix} ${names[0]} ${keyframes[names[0]][0]} \n`); // write "@keyframes empty { }"
            for (let i = 1; i < names.length; i += 1) {
                // * Add "@keyframe name {" line
                await _write(ws, `${prefix} ${names[i]} { \n`);
                for (let j = 0; j < keyframes[names[i]].length; j += 3) {
                    await _write(ws, `${keyframes[names[i]][j]} { ${keyframes[names[i]][j + 1]}: ${keyframes[names[i]][j + 2]} } \n`);
                }
                await _write(ws, "} \n"); // * Closing bracket.
            }
            resolve();
        } catch (error) {
            reject(`"Error Writing keyframes." ERROR: ${error}`);
        }
    });
}

function rgb2Hsv(r: number, g: number, b: number): HUE {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h = 0, s = 0, v = max;
    let c = max - min;

    s = v === 0 ? 0 : c / v;

    if (c !== 0) {
        switch (v) {
            case r:
                h = (g - b) / c + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / c + 2;
                break;
            case b:
                h = (r - g) / c + 4;
                break;
            default:
                break;
        }
        h /= 6;
    }
    return [round(h, 3), round(s, 3), round(v, 3)];
}

/**
 * Convert HSV into RGB.
 * Referenced from : 
 * https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 * @param h - Hue value [0, 1].
 * @param s - Saturation [0,1].
 * @param v - Value [0,1].
 * @returns - Object with r, g, b values.
 */
function hsv2Rgb(h: number, s: number, v: number): RGB {
    let r, g, b;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
        default:
            r = 0, g = 0, b = 0;
            break;
    }
    r = round(r * 255), g = round(g * 255), b = round(b * 255);
    return { r, g, b };
}

function hex2Rgb(hex: string): RGB {
    hex = hex.replace(/[^0-9a-f]/gi, "");
    const r = parseInt(hex[0] + hex[1], 16);
    const g = parseInt(hex[2] + hex[3], 16);
    const b = parseInt(hex[4] + hex[5], 16);
    return { r, g, b };
}

function rgb2Hex(r: number, g: number, b: number): string {
    const _r = _convertValue2Hex(r);
    const _g = _convertValue2Hex(g);
    const _b = _convertValue2Hex(b);
    return "#" + _r + _g + _b;
}

function _convertValue2Hex(v: number): string {
    v = Math.round(v);
    if (v < 0) v = 0;
    if (v > 255) v = 255;

    let s = v.toString(16);
    if (s.length < 2) s = "0" + s;

    return s;
}

/**
 * Lightens / darkens a hexadeciaml color.
 * @param color - Hexadecimal color
 * @param lum - [-1,1] range, -1 being darkest, and 1 brightest.
 * @returns new hexadecimal color.
 */
function colorUtility(color: string, lum: number): string {
    color = color.replace(/[^0-9a-f]/gi, ""); // get rids of the #
    if (color.length < 6) {
        // 000 => 000000
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    lum = lum || 0;

    let c;
    let result = "#";
    for (let i = 0; i < 3; i += 1) {
        c = parseInt(color.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        result += ("00" + c).substr(c.length);
    }

    return result;
}

/**
 * Applies "transparency" to the hexadecimal color.
 * @param color - hexadecimal color.
 * @param alpha - alpha value of the color. [0,1] range.
 * @returns a hexadecimal color of length 8 => #RRGGBBAA.
 */
function alphaUtility(color: string, alpha: number): string {
    color = color.replace(/[^0-9a-f]/gi, "");
    if (color.length < 6) {
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }

    alpha = alpha || 1;
    let result = "#";
    let a = Math.round(alpha * 255).toString(16).padStart(2, "0");

    return result + color + a;
}

/**
 * Asynchronous helper function that writes data into a file
 * with a WriteStream object.
 * @param ws - WriteStream Object.
 * @param data - String data to write.
 * @returns Promise
 */
function _write(ws: WriteStream, data: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        ws.write(data, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

function _validator(input: string): boolean {
    if (input === "none") return true;
    const rgbRegex = /(rgb)\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/gi;
    const hexRegex = /\#([a-f0-9]{6}|[a-f0-9]{3}|[a-f0-9])\b/gi;
    const invalidHexRegex = /\#([a-z0-9]{4,5}|[a-z0-9]{1,2})\b/gi;
    if (input) {
        const all = input.split(/\s/);
        for (let i = 0; i < all.length; i += 1) {
            if (/^#/.test(all[i])) {
                // Check for invalid hexadecimal input
                const invalidHexArr = all[i].match(invalidHexRegex);
                if (invalidHexArr) {
                    console.log(chalk.red("Invalid hexadecimal."));
                    return false;
                }
                const validHexArr = all[i].match(hexRegex);
                if (!validHexArr) {
                    console.log(chalk.red("Invalid hexadecimal."));
                    return false;
                }
            }
            else {
                const validRGB = all[i].match(rgbRegex);
                if (!validRGB) {
                    console.log(chalk.red("Invalid rgb."));
                    return false;
                }
                let group;
                while (group = rgbRegex.exec(input)) {
                    if (!_validateRGB(parseInt(group[2]), parseInt(group[3]), parseInt(group[4]))) {
                        console.log(chalk.red("Invalid rgb."));
                        return false;
                    }
                }
            }
        }
        return true;
    }
    else {
        return false;
    }
}

function _validateRGB(r: number, g: number, b: number): boolean {
    const validRed = (r > -1) && (r < 256);
    const validGreen = (g > -1) && (g < 256);
    const validBlue = (b > -1) && (b < 256);
    return validRed && validGreen && validBlue;
}

function _pathValidator(input: string): boolean {
    return fs.existsSync(input);
}

function _answersFilter(answers: Answers): Answers {
    const keys: string[] = Object.keys(answers);
    for (let key of keys) {
        if (key === "extra") {
            const extras: string[] = answers[key].split(/\s/);
            extras.map(color => {
                if (/^rgb/.test(color)) {
                    const rgbRegex = /(rgb)\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/i;
                    let group = rgbRegex.exec(color) ?? ["rgb", "1", "1", "1"];
                    let r: number = parseInt(group[2]);
                    let g: number = parseInt(group[3]);
                    let b: number = parseInt(group[4]);
                    return rgb2Hex(r, g, b);
                }
                else {
                    return color;
                }
            });
            answers[key] = extras;
        }
        else {
            const color = answers[key].split(/\s/)[0];
            answers[key] = color;
        }
    }
    return answers;
}

function _themeObjectFactory(answers: Answers): Theme {
    const theme: Theme = {
        light: {
            primary: answers.lightPrimary,
            secondary: answers.lightSecondary,
            accent: answers.lightAccent,
            background: answers.lightBg,
            complementary: answers.lightComplementary,
            complementaryColor: answers.lightComplementaryColor,
            btnColor: answers.lightBtnColor,
            borderColor: answers.lightBorderColor,
            disabledColor: answers.lightDisabledColor,
            textColor: answers.lightTextColor,
            headingsColor: answers.lightHeadingsColor,
            tabTextColor: answers.lightTextColor,
            backgroundAlt5: colorUtility(answers.lightBg, -0.05),
            backgroundAlt10: colorUtility(answers.lightBg, -0.1),
            backgroundAlt20: colorUtility(answers.lightBg, -0.2),
            accentDark: colorUtility(answers.lightAccent, -0.3),
            accentLight: colorUtility(answers.lightAccent, 0.2),
            accentTransparent: alphaUtility(answers.lightAccent, 0.8),
            primaryAccent: alphaUtility(answers.lightAccent, 0.4),
            backgroundAccent: alphaUtility(answers.lightAccent, 0.1),
            backgroundDarkAccent: alphaUtility(answers.lightAccent, 0.15),
            itemActiveColor: answers.lightAccent,
            itemActiveBackground: alphaUtility(answers.lightAccent, 0.15),
            complementaryDark: colorUtility(answers.lightComplementary, -0.2),
            itemActiveIconColor: answers.lightAccent,
            btnColorInverse: invert(answers.lightBtnColor),
            btnColorSecondary: colorUtility(answers.lightBtnColor, -0.2)
        },
        dark: {
            primary: answers.darkPrimary,
            secondary: answers.darkSecondary,
            accent: answers.darkAccent,
            background: answers.darkBg,
            complementaryColor: answers.darkComplementaryColor,
            complementary: answers.darkComplementary,
            btnColor: answers.darkBtnColor,
            borderColor: answers.darkBorderColor,
            disabledColor: answers.darkDisabledColor,
            textColor: answers.darkTextColor,
            headingsColor: answers.darkHeadingsColor,
            tabTextColor: answers.darkTextColor,
            backgroundAlt5: colorUtility(answers.lightBg, -0.05),
            backgroundAlt10: colorUtility(answers.lightBg, -0.1),
            backgroundAlt20: colorUtility(answers.lightBg, -0.2),
            accentDark: colorUtility(answers.lightAccent, -0.3),
            accentLight: colorUtility(answers.lightAccent, 0.2),
            accentTransparent: alphaUtility(answers.lightAccent, 0.8),
            primaryAccent: alphaUtility(answers.lightAccent, 0.4),
            backgroundAccent: alphaUtility(answers.lightAccent, 0.1),
            backgroundDarkAccent: alphaUtility(answers.lightAccent, 0.15),
            itemActiveColor: answers.lightAccent,
            itemActiveBackground: alphaUtility(answers.lightAccent, 0.15),
            complementaryDark: colorUtility(answers.lightComplementary, -0.2),
            itemActiveIconColor: answers.lightAccent,
            btnColorInverse: invert(answers.lightBtnColor),
            btnColorSecondary: colorUtility(answers.lightBtnColor, -0.2)
        },
        common: {
            white: "#ffffff",
            black: "#000000",
            grey: "#e0e0e0",
            greyLight: "#bababa",
            charcoal: "#303030",
            transparent: "transparent",
            aqua: "#00caab",
            blue: "#3a53ff",
            brown: "#795548",
            forest: "#006968",
            greyDark: "#5c687c",
            purple: "#8130ff",
            lemon: "#ffea00",
            lime: "#aee406",
            orange: "#f57c00",
            ruby: "#ff1744",
            sky: "#30bcff",
            error: "#d50000",
            fontSize: "12",
            backgroundAlt10: "#c0ebff",
            btnColorSecondary: "#01a0ec",
            btnColorDisabled: "#a4a4a4",
            btnFontSize: "14",
            btnMinWidth: "64",
            btnHeight: "52",
            btnPaddingX: "5",
            btnPaddingY: "0",
            btnMarginX: "16",
            btnMarginY: "8",
            btnRadius: "0",
            headingsFontWeight: "normal",
            headingsMarginBottom: "4",
            borderWidth: "1",
            borderRadius: "10",
            borderRadiusSm: "4",
            borderRadiusLg: "50%",
            iconFontSize: "12",
            iconFontSizeLg: "16",
            disabledOpacity: "0.5"
        },
        destination: answers.destination,
        extraColors: answers.extra
    }
    return theme;
}

/**
 * Ask for the necessary colors from the user and prepare theme.
 */
function buildTheme() {
    const questions: QuestionCollection = [
        {
            type: "input",
            message: "Light Primary:",
            default: "#262626",
            name: "lightPrimary",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Light Background:",
            default: "#fff",
            name: "lightBg",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Light Secondary:",
            default: "#000",
            name: "lightSecondary",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Light Accent:",
            default: "#ef4565",
            name: "lightAccent",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Light Complementary:",
            default: "#3da9fc",
            name: "lightComplementary",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Light Complementary Color:",
            default: "#094067",
            name: "lightComplementaryColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Light Button Color:",
            default: "#3da9fc",
            name: "lightBtnColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Light Border Color:",
            default: "#094067",
            name: "lightBorderColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Light Disabled Color:",
            default: "#bec3cb",
            name: "lightDisabledColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Light Text Color:",
            default: "#5f6c7b",
            name: "lightTextColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Light Headings Color:",
            default: "#094067",
            name: "lightHeadingsColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Light Headings Color:",
            default: "#094067",
            name: "lightHeadingsColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Dark Primary Color:",
            default: "#fff",
            name: "darkPrimary",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Dark Background Color:",
            default: "#16161a",
            name: "darkBg",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Dark Secondary Color:",
            default: "#72757e",
            name: "darkSecondary",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Dark Accent Color:",
            default: "#2cb67d",
            name: "darkAccent",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Dark Complementary:",
            default: "#7f5af0",
            name: "darkComplementary",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Dark Complementary Color:",
            default: "#fffffe",
            name: "darkComplementaryColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Dark Button Color:",
            default: "#7f5af0",
            name: "darkBtnColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Dark Border Color:",
            default: "#94a1b2",
            name: "darkBorderColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Dark Disabled Color:",
            default: "#4b505a",
            name: "darkDisabledColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Dark Text Color:",
            default: "#94a1b2",
            name: "darkTextColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Dark Headings Color:",
            default: "#fffffe",
            name: "darkHeadingsColor",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Extra Colors?:",
            default: "none",
            name: "extra",
            validate: (input) => { return _validator(input) }
        },
        {
            type: "input",
            message: "Save destination:",
            default: "./",
            name: "destination",
            validate: (input) => { return _pathValidator(input) }
        }
    ]
    prompt(questions)
        .then(answers => {
            _build(_themeObjectFactory(_answersFilter(answers)));
        })
        .catch(error => {
            console.log(
                chalk.red(String(error))
            );
        });
}

export {
    buildTheme,
    rgb2Hex,
    colorUtility,
    rgb2Hsv,
    hex2Rgb,
    alphaUtility,
    hsv2Rgb
}