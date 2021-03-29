"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hsv2Rgb = exports.alphaUtility = exports.hex2Rgb = exports.rgb2Hsv = exports.colorUtility = exports.rgb2Hex = exports.buildTheme = void 0;
var inquirer_1 = require("inquirer");
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var invert_color_1 = __importDefault(require("invert-color"));
var keyframes_json_1 = __importDefault(require("./../json/keyframes.json"));
var classes_json_1 = __importDefault(require("./../json/classes.json"));
var math_util_1 = require("./../utils/math.util");
/**
 * Builds the nativescript theme file.
 * @param theme - Theme object.
 */
function _build(theme) {
    return __awaiter(this, void 0, void 0, function () {
        var filename, writeStream, keyframes, classes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filename = "custom.css";
                    writeStream = fs_1.default.createWriteStream(path_1.default.join(theme.destination, filename), { flags: "a", encoding: "utf-8" });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 25, , 26]);
                    keyframes = JSON.parse(JSON.stringify(keyframes_json_1.default));
                    classes = JSON.parse(JSON.stringify(classes_json_1.default));
                    // * Stamping product.
                    console.log(chalk_1.default.bgHex("#3da9fc").white("Building Nativescript Theme..."));
                    writeStream.write("/* Theme Generated With NS7-THEME-BUILDER */");
                    writeStream.write("\n");
                    // * Start...
                    console.log(String.fromCodePoint(0x1F680), chalk_1.default.red("Working as fast as possible..."));
                    return [4 /*yield*/, _writeKeyframes(writeStream, keyframes)];
                case 2:
                    _a.sent();
                    // * Light Theme
                    console.log(String.fromCodePoint(0x1F485), chalk_1.default.hex("#ff8ba7").visible("Applying makeup..."));
                    return [4 /*yield*/, _writeButton(writeStream, classes, theme)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, _writeActivityIndicator(writeStream, classes, theme)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, _writeSegmentedBar(writeStream, classes, theme)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, _writeProgress(writeStream, classes, theme)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, _writeSlider(writeStream, classes, theme)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, _writeSearchBar(writeStream, classes, theme)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, _writeSwitch(writeStream, classes, theme)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, _writeTabView(writeStream, classes, theme)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, _writeTapStrip(writeStream, classes, theme)];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, _writeListView(writeStream, classes, theme)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, _writeRadSideDrawer(writeStream, classes, theme)];
                case 13:
                    _a.sent();
                    console.log(String.fromCodePoint(0x1F4A6), "Uff, almost done...");
                    return [4 /*yield*/, _writeForm(writeStream, classes, theme)];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, _writeTextView(writeStream, classes, theme)];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, _writePropertyEditor(writeStream, classes, theme)];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, _writeRadAutoCompleteTextView(writeStream, classes, theme)];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, _writeRadDataForm(writeStream, classes, theme)];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, _writePickerPage(writeStream, classes, theme)];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, _writeDateTimePicker(writeStream, classes, theme)];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, _writeDataFormEditorLabel(writeStream, classes, theme)];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, _writeActionBar(writeStream, classes, theme)];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, _writeGlobalClasses(writeStream, theme)];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, _writeCommons(writeStream, theme)];
                case 24:
                    _a.sent();
                    console.log(String.fromCodePoint(0x2728), chalk_1.default.yellowBright("Looking fabulous!"));
                    console.log(String.fromCodePoint(0x1F933), chalk_1.default.cyan("Taking a selfie..."));
                    console.log(String.fromCodePoint(0x1F389), chalk_1.default.green("All done!"), String.fromCodePoint(0x2728));
                    writeStream.end();
                    return [3 /*break*/, 26];
                case 25:
                    error_1 = _a.sent();
                    console.log(String.fromCodePoint(0x1F4A3), chalk_1.default.red(error_1));
                    writeStream.end();
                    return [3 /*break*/, 26];
                case 26: return [2 /*return*/];
            }
        });
    });
}
function _writeExtraColors(ws, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var extraColors, i, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    console.log(chalk_1.default.green("Setting extra color variables..."));
                    extraColors = t.extraColors;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < extraColors.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, _write(ws, "--extra-" + i + ": " + extraColors[i] + "; ")];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 1;
                    return [3 /*break*/, 1];
                case 4:
                    resolve();
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    reject("\"Error setting extra color variables.\" ERROR: " + error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
}
function _writeGlobalClasses(ws, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 15, , 16]);
                    console.log(chalk_1.default.green("Setting global classes..."));
                    return [4 /*yield*/, _write(ws, ".text-primary { color: " + t.light.accent + "; } \n")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".ns-dark .text-primary { color: " + t.dark.accent + "; } \n")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".text-danger { color: " + t.common.error + "; } \n")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".bg-primary { color: " + t.light.background + "; background-color: " + t.light.accent + "; } \n")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".ns-dark .bg-primary { color: " + t.dark.background + "; background-color: " + t.dark.accent + "; } \n")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".bg-danger { color: " + t.common.white + "; background-color: " + t.common.error + "; } \n")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".img-rounded { border-radius: " + t.common.borderRadiusSm + "; } \n")];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".img-circle { border-radius: " + t.common.borderRadiusLg + "; } \n")];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".hr { border-color: #d9d9d9; } \n")];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".ns-dark .hr { border-color: #4d4d4d; } \n")];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".hr-light { border-color: #919bad; } \n")];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".ns-dark .hr-light { border-color: #e9ebee; } \n")];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".ns-dark .hr-dark { border-color: #aeb6c3; } \n")];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, ".hr-dark { border-color: #313741; } \n")];
                case 14:
                    _a.sent();
                    resolve();
                    return [3 /*break*/, 16];
                case 15:
                    error_3 = _a.sent();
                    reject("\"Error setting global classes.\" ERROR: " + error_3);
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    }); });
}
function _writeCommons(ws, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var entries, _i, entries_1, _a, key, value, error_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 8, , 9]);
                    console.log(chalk_1.default.green("Setting common variables..."));
                    return [4 /*yield*/, _write(ws, ".ns-root, .ns-modal { ")];
                case 1:
                    _c.sent();
                    entries = Object.entries(t.common);
                    _i = 0, entries_1 = entries;
                    _c.label = 2;
                case 2:
                    if (!(_i < entries_1.length)) return [3 /*break*/, 5];
                    _a = entries_1[_i], key = _a[0], value = _a[1];
                    key = key.replace(/([A-Z])/g, " $1").toLowerCase().replace(/\s/g, "-");
                    return [4 /*yield*/, _write(ws, "--" + key + ": " + value + "; ")];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, _writeExtraColors(ws, t)];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, _write(ws, "} \n")];
                case 7:
                    _c.sent();
                    resolve();
                    return [3 /*break*/, 9];
                case 8:
                    error_4 = _c.sent();
                    reject("\"Error setting common variables.\" ERROR: " + error_4);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); });
}
function _writeActionBar(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, _i, classes_1, _class, line, _a, _c, _property, dark_classes, _d, dark_classes_1, _class, line, _e, _f, _property, error_5;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("ActionBar..."));
                    classes = Object.keys(c.light.ActionBar);
                    _i = 0, classes_1 = classes;
                    _h.label = 1;
                case 1:
                    if (!(_i < classes_1.length)) return [3 /*break*/, 4];
                    _class = classes_1[_i];
                    line = _class + " { ";
                    for (_a = 0, _c = c.light.ActionBar[_class]; _a < _c.length; _a++) {
                        _property = _c[_a];
                        switch (_property) {
                            case "color":
                                line += "color: " + t.light.complementaryColor + "; ";
                                break;
                            case "background-color":
                                if (/\.nt-action-bar__item/g.test(_class))
                                    line += "background-color: " + t.common.transparent + "; ";
                                else
                                    line += "background-color: " + t.light.complementary + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _h.sent();
                    _h.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.ActionBar);
                    _d = 0, dark_classes_1 = dark_classes;
                    _h.label = 5;
                case 5:
                    if (!(_d < dark_classes_1.length)) return [3 /*break*/, 8];
                    _class = dark_classes_1[_d];
                    line = _class + " { ";
                    for (_e = 0, _f = c.dark.ActionBar[_class]; _e < _f.length; _e++) {
                        _property = _f[_e];
                        switch (_property) {
                            case "color":
                                line += "color: " + t.dark.complementaryColor + "; ";
                                break;
                            case "background-color":
                                if (/\.nt-action-bar__item/g.test(_class))
                                    line += "background-color: " + t.common.transparent + "; ";
                                else
                                    line += "background-color: " + t.dark.complementary + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _h.sent();
                    _h.label = 7;
                case 7:
                    _d++;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_5 = _h.sent();
                    reject("\"Error applying ActionBar theme.\" ERROR: " + error_5);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writeDataFormEditorLabel(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var light_class, dark_class, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(chalk_1.default.green("DataFormEditorLabel..."));
                    light_class = Object.keys(c.light.DataFormEditorLabel)[0];
                    dark_class = Object.keys(c.dark.DataFormEditorLabel)[0];
                    return [4 /*yield*/, _write(ws, light_class + " { color: " + colorUtility(t.light.textColor, -0.1) + "; } \n")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, dark_class + " { color: " + colorUtility(t.dark.textColor, -0.1) + "; } \n")];
                case 2:
                    _a.sent();
                    resolve();
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    reject("\"Error applying DataFormEditorLabel theme.\" ERROR: " + error_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
function _writeDateTimePicker(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, _i, classes_2, _class, line, _a, _c, _property, dark_classes, _d, dark_classes_2, _class, line, _e, _f, _property, error_7;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("DateTimePicker..."));
                    classes = Object.keys(c.light.DateTimePicker);
                    _i = 0, classes_2 = classes;
                    _h.label = 1;
                case 1:
                    if (!(_i < classes_2.length)) return [3 /*break*/, 4];
                    _class = classes_2[_i];
                    line = _class + " { ";
                    for (_a = 0, _c = c.light.DateTimePicker[_class]; _a < _c.length; _a++) {
                        _property = _c[_a];
                        switch (_property) {
                            case "color":
                                if (/\bbuttons\b/.test(_class))
                                    line += "color: " + colorUtility(t.light.textColor, -0.2) + "; ";
                                else if (/\bspinners\b/.test(_class))
                                    line += "color: " + colorUtility(t.light.textColor, -0.1) + "; ";
                                else
                                    line += "color: " + t.light.textColor + "; ";
                                break;
                            case "background":
                                line += "background: " + t.light.background + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _h.sent();
                    _h.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.DateTimePicker);
                    _d = 0, dark_classes_2 = dark_classes;
                    _h.label = 5;
                case 5:
                    if (!(_d < dark_classes_2.length)) return [3 /*break*/, 8];
                    _class = dark_classes_2[_d];
                    line = _class + " { ";
                    for (_e = 0, _f = c.dark.DateTimePicker[_class]; _e < _f.length; _e++) {
                        _property = _f[_e];
                        switch (_property) {
                            case "color":
                                if (/\bbuttons\b/.test(_class))
                                    line += "color: " + colorUtility(t.dark.textColor, -0.2) + "; ";
                                else if (/\bspinners\b/.test(_class))
                                    line += "color: " + colorUtility(t.dark.textColor, -0.1) + "; ";
                                else
                                    line += "color: " + t.dark.textColor + "; ";
                                break;
                            case "background":
                                line += "background: " + t.dark.background + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _h.sent();
                    _h.label = 7;
                case 7:
                    _d++;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_7 = _h.sent();
                    reject("\"Error applying DateTimePicker theme.\" ERROR: " + error_7);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writePickerPage(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, _i, classes_3, _class, line, _a, _c, _property, dark_classes, _d, dark_classes_3, _class, line, _e, _f, _property, error_8;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("PickerPage..."));
                    classes = Object.keys(c.light.PickerPage);
                    _i = 0, classes_3 = classes;
                    _h.label = 1;
                case 1:
                    if (!(_i < classes_3.length)) return [3 /*break*/, 4];
                    _class = classes_3[_i];
                    line = _class + " { ";
                    for (_a = 0, _c = c.light.PickerPage[_class]; _a < _c.length; _a++) {
                        _property = _c[_a];
                        switch (_property) {
                            case "color":
                                line += "color: " + t.light.textColor + "; ";
                                break;
                            case "background":
                                line += "background: " + t.light.background + "; ";
                                break;
                            case "border-bottom-color":
                                line += "border-bottom-color: " + t.light.primaryAccent + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _h.sent();
                    _h.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.PickerPage);
                    _d = 0, dark_classes_3 = dark_classes;
                    _h.label = 5;
                case 5:
                    if (!(_d < dark_classes_3.length)) return [3 /*break*/, 8];
                    _class = dark_classes_3[_d];
                    line = _class + " { ";
                    for (_e = 0, _f = c.dark.PickerPage[_class]; _e < _f.length; _e++) {
                        _property = _f[_e];
                        switch (_property) {
                            case "color":
                                line += "color: " + t.dark.textColor + "; ";
                                break;
                            case "background":
                                line += "background: " + t.dark.background + "; ";
                                break;
                            case "border-bottom-color":
                                line += "border-bottom-color: " + t.dark.primaryAccent + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _h.sent();
                    _h.label = 7;
                case 7:
                    _d++;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_8 = _h.sent();
                    reject("\"Error applying PickerPage theme.\" ERROR: " + error_8);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writeRadDataForm(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, _i, classes_4, _class, line, _a, _c, _property, dark_classes, _d, dark_classes_4, _class, line, _e, _f, _property, error_9;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("RadDataForm..."));
                    classes = Object.keys(c.light.RadDataForm);
                    _i = 0, classes_4 = classes;
                    _h.label = 1;
                case 1:
                    if (!(_i < classes_4.length)) return [3 /*break*/, 4];
                    _class = classes_4[_i];
                    line = _class + " { ";
                    for (_a = 0, _c = c.light.RadDataForm[_class]; _a < _c.length; _a++) {
                        _property = _c[_a];
                        switch (_property) {
                            case "color":
                                line += "color: " + t.light.textColor + "; ";
                                break;
                            case "background-color":
                                line += "background-color: " + t.light.background + "; ";
                                break;
                            case "placeholder-color":
                                line += "placeholder-color: " + t.common.greyLight + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _h.sent();
                    _h.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.RadDataForm);
                    _d = 0, dark_classes_4 = dark_classes;
                    _h.label = 5;
                case 5:
                    if (!(_d < dark_classes_4.length)) return [3 /*break*/, 8];
                    _class = dark_classes_4[_d];
                    line = _class + " { ";
                    for (_e = 0, _f = c.dark.RadDataForm[_class]; _e < _f.length; _e++) {
                        _property = _f[_e];
                        switch (_property) {
                            case "color":
                                line += "color: " + t.dark.textColor + "; ";
                                break;
                            case "background-color":
                                line += "background-color: " + t.dark.background + "; ";
                                break;
                            case "placeholder-color":
                                line += "placeholder-color: " + t.common.greyLight + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _h.sent();
                    _h.label = 7;
                case 7:
                    _d++;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_9 = _h.sent();
                    reject("\"Error applying RadDataForm theme.\" ERROR: " + error_9);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writeRadAutoCompleteTextView(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, _i, classes_5, _class, line, _a, _c, _property, dark_classes, _d, dark_classes_5, _class, line, _e, _f, _property, error_10;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("RadAutoCompleteTextView..."));
                    classes = Object.keys(c.light.RadAutoCompleteTextView);
                    _i = 0, classes_5 = classes;
                    _h.label = 1;
                case 1:
                    if (!(_i < classes_5.length)) return [3 /*break*/, 4];
                    _class = classes_5[_i];
                    line = _class + " { ";
                    for (_a = 0, _c = c.light.RadAutoCompleteTextView[_class]; _a < _c.length; _a++) {
                        _property = _c[_a];
                        switch (_property) {
                            case "background-color":
                                if (/\:selected/gi.test(_class))
                                    line += "background-color: " + t.light.accentLight + "; ";
                                else if (/SuggestionView/g.test(_class))
                                    line += "background-color: " + t.light.background + "; ";
                                else
                                    line += "background-color: " + t.light.accentDark + "; ";
                                break;
                            case "color":
                                if (/ClearButton/g.test(_class))
                                    line += "color: " + t.light.accent + "; ";
                                else
                                    line += "color: " + t.light.textColor + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _h.sent();
                    _h.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.RadAutoCompleteTextView);
                    _d = 0, dark_classes_5 = dark_classes;
                    _h.label = 5;
                case 5:
                    if (!(_d < dark_classes_5.length)) return [3 /*break*/, 8];
                    _class = dark_classes_5[_d];
                    line = _class + " { ";
                    for (_e = 0, _f = c.dark.RadAutoCompleteTextView[_class]; _e < _f.length; _e++) {
                        _property = _f[_e];
                        switch (_property) {
                            case "background-color":
                                if (/\:selected/gi.test(_class))
                                    line += "background-color: " + t.dark.accentLight + "; ";
                                else if (/SuggestionView/g.test(_class))
                                    line += "background-color: " + t.dark.background + "; ";
                                else
                                    line += "background-color: " + t.dark.accentDark + "; ";
                                break;
                            case "color":
                                if (/ClearButton/g.test(_class))
                                    line += "color: " + t.dark.accent + "; ";
                                else
                                    line += "color: " + t.dark.textColor + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _h.sent();
                    _h.label = 7;
                case 7:
                    _d++;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_10 = _h.sent();
                    reject("\"Error applying RadAutoCompleteTextView theme.\" ERROR: " + error_10);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writePropertyEditor(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var light_class, dark_class, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(chalk_1.default.green("PropertyEditor..."));
                    light_class = Object.keys(c.light.PropertyEditor)[0];
                    dark_class = Object.keys(c.dark.PropertyEditor)[0];
                    return [4 /*yield*/, _write(ws, light_class + " { border-color: " + t.light.accentDark + "; } \n")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, _write(ws, dark_class + " { border-color: " + t.dark.accentDark + "; } \n")];
                case 2:
                    _a.sent();
                    resolve();
                    return [3 /*break*/, 4];
                case 3:
                    error_11 = _a.sent();
                    reject("\"Error applying PropertyEditor theme.\" ERROR: " + error_11);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
function _writeTextView(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, i, line, j, dark_classes, i, line, j, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("TextView..."));
                    classes = Object.keys(c.light.TextView);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < classes.length)) return [3 /*break*/, 4];
                    line = classes[i] + " { ";
                    for (j = 0; j < c.light.TextView[classes[i]].length; j += 1) {
                        switch (c.light.TextView[classes[i]][j]) {
                            case "background-color":
                                if (/\[isEnabled=false\]/gi.test(classes[i]))
                                    line += "background-color: " + t.light.backgroundAlt5 + "; ";
                                else
                                    line += "background-color: " + t.common.transparent + "; ";
                                break;
                            case "color":
                                if (/\[isEnabled=false\]/gi.test(classes[i]))
                                    line += "color: " + t.light.disabledColor + "; ";
                                else
                                    line += "color: " + t.light.background + "; ";
                                break;
                            case "placeholder-color":
                                line += "placeholder-color: " + t.common.greyLight + "; ";
                                break;
                            case "border-color":
                                if (/\:focus/gi.test(classes[i]))
                                    line += "border-color: " + t.light.accentDark + "; ";
                                else
                                    line += "border-color: " + t.light.backgroundAlt5 + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 1;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.TextView);
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < dark_classes.length)) return [3 /*break*/, 8];
                    line = dark_classes[i] + " { ";
                    for (j = 0; j < c.dark.TextView[dark_classes[i]].length; j += 1) {
                        switch (c.dark.TextView[dark_classes[i]][j]) {
                            case "background-color":
                                if (/\[isEnabled=false\]/gi.test(dark_classes[i]))
                                    line += "background-color: " + t.dark.backgroundAlt5 + "; ";
                                else
                                    line += "background-color: " + t.common.transparent + "; ";
                                break;
                            case "color":
                                if (/\[isEnabled=false\]/gi.test(dark_classes[i]))
                                    line += "color: " + t.dark.disabledColor + "; ";
                                else
                                    line += "color: " + t.dark.background + "; ";
                                break;
                            case "placeholder-color":
                                line += "placeholder-color: " + t.common.greyDark + "; ";
                                break;
                            case "border-color":
                                if (/\:focus/gi.test(dark_classes[i]))
                                    line += "border-color: " + t.dark.accentDark + "; ";
                                else
                                    line += "border-color: " + t.dark.backgroundAlt5 + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i += 1;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_12 = _a.sent();
                    reject("\"Error applying TextView theme.\" ERROR: " + error_12);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writeForm(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, i, line, j, dark_class, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    console.log(chalk_1.default.green("Form..."));
                    classes = Object.keys(c.light.Form);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < classes.length)) return [3 /*break*/, 4];
                    line = classes[i] + " { ";
                    for (j = 0; j < c.light.Form[classes[i]].length; j += 1) {
                        switch (c.light.Form[classes[i]][j]) {
                            case "font-size":
                                line += "font-size: " + t.common.btnFontSize + "; ";
                                break;
                            case "color":
                                if (/\.nt-form__validation-message/gi.test(classes[i]))
                                    line += "color: " + t.common.error + "; ";
                                else
                                    line += "color: " + t.light.accent + "; ";
                                break;
                            case "opacity":
                                line += "opacity: " + t.common.disabledOpacity + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 1;
                    return [3 /*break*/, 1];
                case 4:
                    dark_class = Object.keys(c.dark.Form)[0];
                    return [4 /*yield*/, _write(ws, dark_class + " { color: " + t.dark.accent + "; } \n")];
                case 5:
                    _a.sent();
                    resolve();
                    return [3 /*break*/, 7];
                case 6:
                    error_13 = _a.sent();
                    reject("\"Error applying From theme.\" ERROR: " + error_13);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); });
}
function _writeRadSideDrawer(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, i, line, j, dark_classes, i, line, j, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("RadSideDrawer..."));
                    classes = Object.keys(c.light.RadSideDrawer);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < classes.length)) return [3 /*break*/, 4];
                    line = classes[i] + " { ";
                    for (j = 0; j < c.light.RadSideDrawer[classes[i]].length; j += 1) {
                        switch (c.light.RadSideDrawer[classes[i]][j]) {
                            case "color":
                                if (/\.nt-drawer__header/gi.test(classes[i]))
                                    line += "color: " + t.light.complementaryColor + "; ";
                                else
                                    line += "color: " + t.light.accentDark + "; ";
                                break;
                            case "background-color":
                                if (/\.nt-drawer__header/gi.test(classes[i]))
                                    line += "background-color: " + t.light.complementaryDark + "; ";
                                else if (/\.nt-drawer__content/gi.test(classes[i]))
                                    line += "background-color: " + t.light.background + "; ";
                                else
                                    line += "background-color: " + t.light.backgroundDarkAccent + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 1;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.RadSideDrawer);
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < dark_classes.length)) return [3 /*break*/, 8];
                    line = dark_classes[i] + " { ";
                    for (j = 0; j < c.dark.RadSideDrawer[dark_classes[i]].length; j += 1) {
                        switch (c.dark.RadSideDrawer[dark_classes[i]][j]) {
                            case "color":
                                if (/\.nt-drawer__header/gi.test(dark_classes[i]))
                                    line += "color: " + t.dark.complementaryColor + "; ";
                                else
                                    line += "color: " + t.dark.accentDark + "; ";
                                break;
                            case "background-color":
                                if (/\.nt-drawer__header/gi.test(dark_classes[i]))
                                    line += "background-color: " + t.dark.complementaryDark + "; ";
                                else if (/\.nt-drawer__content/gi.test(dark_classes[i]))
                                    line += "background-color: " + t.dark.background + "; ";
                                else
                                    line += "background-color: " + t.dark.backgroundDarkAccent + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i += 1;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_14 = _a.sent();
                    reject("\"Error applying RadSideDrawer theme.\" ERROR: " + error_14);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writeListView(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, i, line, j, dark_classes, i, line, j, error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("ListView..."));
                    classes = Object.keys(c.light.ListView);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < classes.length)) return [3 /*break*/, 4];
                    line = classes[i] + " { ";
                    for (j = 0; j < c.light.ListView[classes[i]].length; j += 1) {
                        switch (c.light.ListView[classes[i]][j]) {
                            case "item-selected-background-color":
                                line += "item-selected-background-color: " + t.light.backgroundDarkAccent + "; ";
                                break;
                            case "separator-color":
                                line += "separator-color: " + t.light.backgroundAlt20 + "; ";
                                break;
                            case "background-color":
                                if (/\*\.active/gi.test(classes[i]))
                                    line += "background-color: " + t.light.backgroundAlt20 + "; ";
                                else
                                    line += "background-color: " + t.common.error + "; ";
                                break;
                            case "color":
                                line += "color: " + t.common.black + "; ";
                                break;
                            case "border-bottom-color":
                                line += "border-bottom-color: " + t.light.accentLight + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 1;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.ListView);
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < dark_classes.length)) return [3 /*break*/, 8];
                    line = dark_classes[i] + " { ";
                    for (j = 0; j < c.dark.ListView[dark_classes[i]].length; j += 1) {
                        switch (c.dark.ListView[dark_classes[i]][j]) {
                            case "item-selected-background-color":
                                line += "item-selected-background-color: " + t.dark.backgroundDarkAccent + "; ";
                                break;
                            case "separator-color":
                                line += "separator-color: " + t.dark.backgroundAlt20 + "; ";
                                break;
                            case "background-color":
                                if (/\*\.active/gi.test(classes[i]))
                                    line += "background-color: " + t.dark.backgroundAlt20 + "; ";
                                else
                                    line += "background-color: " + t.common.error + "; ";
                                break;
                            case "color":
                                line += "color: " + t.common.black + "; ";
                                break;
                            case "border-bottom-color":
                                line += "border-bottom-color: " + t.dark.accentLight + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i += 1;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_15 = _a.sent();
                    reject("\"Error applying ListView theme.\" ERROR: " + error_15);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writeTapStrip(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, i, line, j, dark_classes, i, line, j, error_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("TabStrip..."));
                    classes = Object.keys(c.light.TabStrip);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < classes.length)) return [3 /*break*/, 4];
                    line = classes[i] + " { ";
                    for (j = 0; j < c.light.TabStrip[classes[i]].length; j += 1) {
                        switch (c.light.TabStrip[classes[i]][j]) {
                            case "highlight-color":
                                line += "highlight-color: " + t.light.accent + "; ";
                                break;
                            case "background":
                                line += "background: " + t.light.backgroundAlt5 + "; ";
                                break;
                            case "color":
                                if (/\b:active\b/gi.test(classes[i]))
                                    line += "color: " + t.light.accent + "; ";
                                else
                                    line += "color: " + t.light.headingsColor + "; ";
                                break;
                            case "background":
                                line += "background: " + t.light.background;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 1;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.TabStrip);
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < dark_classes.length)) return [3 /*break*/, 8];
                    line = dark_classes[i] + " { ";
                    for (j = 0; j < c.dark.TabStrip[dark_classes[i]].length; j += 1) {
                        switch (c.dark.TabStrip[dark_classes[i]][j]) {
                            case "highlight-color":
                                line += "highlight-color: " + t.dark.accent + "; ";
                                break;
                            case "background":
                                line += "background: " + t.dark.backgroundAlt5 + "; ";
                                break;
                            case "color":
                                if (/\b:active\b/gi.test(dark_classes[i]))
                                    line += "color: " + t.light.accent + "; ";
                                else
                                    line += "color: " + t.dark.headingsColor + "; ";
                                break;
                            case "background":
                                line += "background: " + t.dark.background;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i += 1;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_16 = _a.sent();
                    reject("\"Error applying TabView theme.\" ERROR: " + error_16);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writeTabView(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, i, line, j, dark_classes, i, line, j, error_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("TabView..."));
                    classes = Object.keys(c.light.TabView);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < classes.length)) return [3 /*break*/, 4];
                    line = classes[i] + " { ";
                    for (j = 0; j < c.light.TabView[classes[i]].length; j += 1) {
                        switch (c.light.TabView[classes[i]][j]) {
                            case "selected-tab-text-color":
                                line += "selected-tab-text-color: " + t.light.accent + "; ";
                                break;
                            case "tab-background-color":
                                line += "tab-background-color: " + t.light.background + "; ";
                                break;
                            case "tab-text-color":
                                line += "tab-text-color: " + t.light.tabTextColor + "; ";
                                break;
                            case "android-selected-tab-highlight-color":
                                line += "android-selected-tab-highlight-color: " + t.light.accent + "; ";
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 1;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.TabView);
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < dark_classes.length)) return [3 /*break*/, 8];
                    line = dark_classes[i] + " { ";
                    for (j = 0; j < c.dark.TabView[dark_classes[i]].length; j += 1) {
                        switch (c.dark.TabView[dark_classes[i]][j]) {
                            case "selected-tab-text-color":
                                line += "selected-tab-text-color: " + t.dark.accent + "; ";
                                break;
                            case "tab-background-color":
                                line += "tab-background-color: " + t.dark.background + "; ";
                                break;
                            case "tab-text-color":
                                line += "tab-text-color: " + t.dark.tabTextColor + "; ";
                                break;
                            case "android-selected-tab-highlight-color":
                                line += "android-selected-tab-highlight-color: " + t.dark.accent + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i += 1;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_17 = _a.sent();
                    reject("\"Error applying TabView theme.\" ERROR: " + error_17);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writeSwitch(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, i, line, j, dark_classes, i, line, j, error_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("Switch..."));
                    classes = Object.keys(c.light.Switch);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < classes.length)) return [3 /*break*/, 4];
                    line = classes[i] + " { ";
                    for (j = 0; j < c.light.Switch[classes[i]].length; j += 1) {
                        switch (c.light.Switch[classes[i]][j]) {
                            case "color":
                                if (/\[checked=true\]/gi.test(classes[i]))
                                    line += "color: " + t.light.accent + "; ";
                                else if (/\[isEnabled=false\]/gi.test(classes[i]))
                                    line += "color: " + t.light.backgroundAlt10 + "; ";
                                else {
                                    if (/\.ns-android/gi.test(classes[i]))
                                        line += "color: " + t.light.backgroundAlt20 + "; ";
                                    else
                                        line += "color: " + t.light.background + "; ";
                                }
                                break;
                            case "background-color":
                                if (/\.ns-android/gi.test(classes[i]))
                                    line += "background-color: " + t.light.backgroundAlt20 + "; ";
                                else
                                    line += "background-color: " + t.light.accent + "; ";
                                break;
                            case "off-background-color":
                                line += "off-background-color: " + t.light.backgroundAlt10 + "; ";
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 1;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.Switch);
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < dark_classes.length)) return [3 /*break*/, 8];
                    line = dark_classes[i] + " { ";
                    for (j = 0; j < c.dark.Switch[dark_classes[i]].length; j += 1) {
                        switch (c.dark.Switch[dark_classes[i]][j]) {
                            case "color":
                                if (/\[checked=true\]/gi.test(dark_classes[i]))
                                    line += "color: " + t.dark.accent + "; ";
                                else if (/\[isEnabled=false\]/gi.test(dark_classes[i]))
                                    line += "color: " + t.dark.backgroundAlt10 + "; ";
                                else {
                                    if (/\.ns-android/gi.test(dark_classes[i]))
                                        line += "color: " + t.dark.backgroundAlt20 + "; ";
                                    else
                                        line += "color: " + t.dark.background + "; ";
                                }
                                break;
                            case "background-color":
                                if (/\.ns-android/gi.test(dark_classes[i]))
                                    line += "background-color: " + t.dark.backgroundAlt20 + "; ";
                                else
                                    line += "background-color: " + t.dark.accent + "; ";
                                break;
                            case "off-background-color":
                                line += "off-background-color: " + t.dark.backgroundAlt10;
                                break;
                            default:
                                line += "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i += 1;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_18 = _a.sent();
                    reject("\"Error applying switch theme.\" ERROR: " + error_18);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writeSearchBar(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var _class, line, i, dark_class, i, error_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(chalk_1.default.green("SearchBar..."));
                    _class = Object.keys(c.light.SearchBar)[0];
                    line = _class + " { ";
                    for (i = 0; i < c.light.SearchBar[_class].length; i += 1) {
                        switch (c.light.SearchBar[_class][i]) {
                            case ("color"):
                                line = line + ("color: " + t.light.headingsColor + "; ");
                                break;
                            case ("background-color"):
                                line = line + ("background-color: " + t.light.background + "; ");
                            case ("text-field-hint-color"):
                                line = line + ("text-field-hint-color: " + t.common.black + "; ");
                                break;
                            case ("text-field-background-color"):
                                line = line + "text-field-background-color: transparent; ";
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 1:
                    _a.sent();
                    dark_class = Object.keys(c.dark.SearchBar)[0];
                    line = dark_class + " { ";
                    for (i = 0; i < c.dark.SearchBar[dark_class].length; i += 1) {
                        switch (c.dark.SearchBar[dark_class][i]) {
                            case ("color"):
                                line = line + ("color: " + t.dark.headingsColor + "; ");
                                break;
                            case ("background-color"):
                                line = line + ("background-color: " + t.dark.background + "; ");
                            case ("text-field-hint-color"):
                                line = line + ("text-field-hint-color: " + t.common.black + "; ");
                                break;
                            case ("text-field-background-color"):
                                line = line + "text-field-background-color: transparent; ";
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    resolve();
                    return [3 /*break*/, 4];
                case 3:
                    error_19 = _a.sent();
                    reject("\"Error applying search bar theme.\" ERROR: " + error_19);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
/**
 * Write slider classes into theme css.
 * @param ws - writestream
 * @param c - classes
 * @param t - theme
 * @returns Promise resolves void.
 */
function _writeSlider(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, i, line, isEnabled, j, dark_classes, i, line, isEnabled, j, error_20;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("Slider..."));
                    classes = Object.keys(c.light.Slider);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < classes.length)) return [3 /*break*/, 4];
                    line = classes[i] + " { ";
                    isEnabled = true;
                    if (/\[isEnabled=false\]/.test(classes[i]))
                        isEnabled = false;
                    for (j = 0; j < c.light.Slider[classes[i]].length; j += 1) {
                        switch (c.light.Slider[classes[i]][j]) {
                            case ("color"):
                                line = line + ("color: " + (isEnabled ? t.light.accent : "#e0e0e0") + "; ");
                                break;
                            case ("background-color"):
                                line = line + ("background-color: " + (isEnabled ? t.light.accent : "#e0e0e0") + "; ");
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 1;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.Slider);
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < dark_classes.length)) return [3 /*break*/, 8];
                    line = dark_classes[i] + " { ";
                    isEnabled = true;
                    if (/\[isEnabled=false\]/.test(dark_classes[i]))
                        isEnabled = false;
                    for (j = 0; j < c.dark.Slider[dark_classes[i]].length; j += 1) {
                        switch (c.dark.Slider[dark_classes[i]][j]) {
                            case ("color"):
                                line = line + ("color: " + (isEnabled ? t.dark.accent : "#e0e0e0") + "; ");
                                break;
                            case ("background-color"):
                                line = line + ("background-color: " + (isEnabled ? t.dark.accent : "#e0e0e0") + "; ");
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i += 1;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_20 = _a.sent();
                    reject("\"Error applying slider theme.\" ERROR: " + error_20);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
/**
 * Write progress classes into theme css.
 * @param ws - writestream
 * @param c - classes
 * @param t - theme
 * @returns Promise resolves void.
 */
function _writeProgress(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var _class, line, i, dark_class, i, error_21;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(chalk_1.default.green("Progress..."));
                    _class = Object.keys(c.light.Progress)[0];
                    line = _class + " { ";
                    for (i = 0; i < c.light.Progress[_class].length; i += 1) {
                        switch (c.light.Progress[_class][i]) {
                            case ("color"):
                                line = line + ("color: " + t.light.accent + "; ");
                                break;
                            case ("background-color"):
                                line = line + ("background-color: " + t.light.backgroundAccent + "; ");
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 1:
                    _a.sent();
                    dark_class = Object.keys(c.dark.Progress)[0];
                    line = dark_class + " { ";
                    for (i = 0; i < c.dark.Progress[dark_class].length; i += 1) {
                        switch (c.dark.Progress[dark_class][i]) {
                            case ("color"):
                                line = line + ("color: " + t.dark.accent + "; ");
                                break;
                            case ("background-color"):
                                line = line + ("background-color:  " + t.dark.backgroundAccent + "; ");
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    resolve();
                    return [3 /*break*/, 4];
                case 3:
                    error_21 = _a.sent();
                    reject("\"Error applying progress theme.\" ERROR: " + error_21);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
function _writeSegmentedBar(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, i, line, j, dark_classes, i, line, j, error_22;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("SegmentedBar..."));
                    classes = Object.keys(c.light.SegmentedBar);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < classes.length)) return [3 /*break*/, 4];
                    line = classes[i] + " { ";
                    for (j = 0; j < c.light.SegmentedBar[classes[i]].length; j += 1) {
                        // add property for of each class
                        switch (c.light.SegmentedBar[classes[i]][j]) {
                            case ("color"):
                                line = line + ("color: " + t.light.headingsColor + "; ");
                                break;
                            case ("background-color"):
                                line = line + ("background-color: " + t.light.background + "; ");
                                break;
                            case ("selected-background-color"):
                                line = line + ("selected-background-color: " + t.light.accent + "; ");
                                break;
                            case ("margin"):
                                line = line + "margin: 0 15; ";
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 1;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.SegmentedBar);
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < dark_classes.length)) return [3 /*break*/, 8];
                    line = dark_classes[i] + " { ";
                    for (j = 0; j < c.dark.SegmentedBar[dark_classes[i]].length; j += 1) {
                        // add property for of each class
                        switch (c.dark.SegmentedBar[dark_classes[i]][j]) {
                            case ("color"):
                                line = line + ("color: " + t.dark.headingsColor + "; ");
                                break;
                            case ("background-color"):
                                line = line + ("background-color: " + t.dark.background + "; ");
                                break;
                            case ("selected-background-color"):
                                line = line + ("selected-background-color: " + t.dark.accent + "; ");
                                break;
                            case ("margin"):
                                line = line + "margin: 0 15; ";
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i += 1;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_22 = _a.sent();
                    reject("\"Error applying segmented bar theme.\" ERROR: " + error_22);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writeActivityIndicator(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, i, line, j, dark_classes, i, line, j, error_23;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("ActivityIndicator..."));
                    classes = Object.keys(c.light.ActivityIndicator);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < classes.length)) return [3 /*break*/, 4];
                    line = classes[i] + " { ";
                    for (j = 0; j < c.light.ActivityIndicator[classes[i]].length; j += 1) {
                        switch (c.light.ActivityIndicator[classes[i]][j]) {
                            case ("color"):
                                line = line + ("color: " + t.light.secondary + "; ");
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 1;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.ActivityIndicator);
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < dark_classes.length)) return [3 /*break*/, 8];
                    line = dark_classes[i] + " { ";
                    for (j = 0; j < c.dark.ActivityIndicator[dark_classes[i]].length; j += 1) {
                        switch (c.dark.ActivityIndicator[dark_classes[i]][j]) {
                            case ("color"):
                                line = line + ("color: " + t.dark.secondary + "; ");
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i += 1;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_23 = _a.sent();
                    reject("\"Error applying activity indicator light theme.\" ERROR: " + error_23);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writeButton(ws, c, t) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var classes, i, line, isOutlineButton, isOutlineButtonActive, j, color, dark_classes, i, line, isOutlineButton, isOutlineButtonActive, j, color, error_24;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    console.log(chalk_1.default.green("Button..."));
                    classes = Object.keys(c.light.Button);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < classes.length)) return [3 /*break*/, 4];
                    line = classes[i] + " { ";
                    isOutlineButton = false;
                    isOutlineButtonActive = false;
                    // test for outline:active \b\.-outline(\:active|\.-active)\b
                    if (/\b\.-outline(\:active|\.-active)\b/.test(classes[i])) {
                        isOutlineButtonActive = true;
                    }
                    else if (/\b\.-outline\b/.test(classes[i])) {
                        // test for outline \b\.-outline\b
                        isOutlineButton = true;
                    }
                    for (j = 0; j < c.light.Button[classes[i]].length; j += 1) {
                        switch (c.light.Button[classes[i]][j]) {
                            case ("background-color"):
                                color = void 0;
                                if (isOutlineButton)
                                    color = "#fff";
                                else if (isOutlineButtonActive)
                                    color = "#f2f2f2";
                                else
                                    color = t.light.primary;
                                line = line + ("background-color: " + color + "; ");
                                break;
                            case ("color"):
                                line = line + ("color: " + t.light.textColor + "; ");
                                break;
                            case ("animation"):
                                line = line + "animation: -hightlight-light .3s ease-out forwards; ";
                                break;
                            case ("border-color"):
                                line = line + ("border-color: " + t.light.accent + "; ");
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += 1;
                    return [3 /*break*/, 1];
                case 4:
                    dark_classes = Object.keys(c.dark.Button);
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < dark_classes.length)) return [3 /*break*/, 8];
                    line = dark_classes[i] + " { ";
                    isOutlineButton = false;
                    isOutlineButtonActive = false;
                    // test for outline:active \b\.-outline(\:active|\.-active)\b
                    if (/\b\.-outline(\:active|\.-active)\b/.test(dark_classes[i])) {
                        isOutlineButtonActive = true;
                    }
                    else if (/\b\.-outline\b/.test(dark_classes[i])) {
                        // test for outline \b\.-outline\b
                        isOutlineButton = true;
                    }
                    for (j = 0; j < c.dark.Button[dark_classes[i]].length; j += 1) {
                        switch (c.dark.Button[dark_classes[i]][j]) {
                            case ("background-color"):
                                color = void 0;
                                if (isOutlineButton)
                                    color = "#fff";
                                else if (isOutlineButtonActive)
                                    color = "#f2f2f2";
                                else
                                    color = t.dark.primary;
                                line = line + ("background-color: " + color + "; ");
                                break;
                            case ("color"):
                                line = line + ("color: " + t.dark.textColor + "; ");
                                break;
                            case ("animation"):
                                line = line + "animation: -hightlight-light .3s ease-out forwards; ";
                                break;
                            case ("border-color"):
                                line = line + ("border-color: " + t.dark.accent + "; ");
                                break;
                            default:
                                line = line + "} \n";
                                break;
                        }
                    }
                    return [4 /*yield*/, _write(ws, line)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i += 1;
                    return [3 /*break*/, 5];
                case 8:
                    resolve();
                    return [3 /*break*/, 10];
                case 9:
                    error_24 = _a.sent();
                    reject("\"Error applying light theme colors to Button.\" ERROR: " + error_24);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
function _writeKeyframes(ws, keyframes) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var names, prefix, i, j, error_25;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    console.log(String.fromCodePoint(0x1F3AC), chalk_1.default.blue("Adding animation keyframes..."));
                    names = Object.keys(keyframes);
                    prefix = "@keyframes";
                    return [4 /*yield*/, _write(ws, prefix + " " + names[0] + " " + keyframes[names[0]][0] + " \n")];
                case 1:
                    _a.sent(); // write "@keyframes empty { }"
                    i = 1;
                    _a.label = 2;
                case 2:
                    if (!(i < names.length)) return [3 /*break*/, 10];
                    // * Add "@keyframe name {" line
                    return [4 /*yield*/, _write(ws, prefix + " " + names[i] + " { \n")];
                case 3:
                    // * Add "@keyframe name {" line
                    _a.sent();
                    j = 0;
                    _a.label = 4;
                case 4:
                    if (!(j < keyframes[names[i]].length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, _write(ws, keyframes[names[i]][j] + " { " + keyframes[names[i]][j + 1] + ": " + keyframes[names[i]][j + 2] + " } \n")];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    j += 3;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, _write(ws, "} \n")];
                case 8:
                    _a.sent(); // * Closing bracket.
                    _a.label = 9;
                case 9:
                    i += 1;
                    return [3 /*break*/, 2];
                case 10:
                    resolve();
                    return [3 /*break*/, 12];
                case 11:
                    error_25 = _a.sent();
                    reject("\"Error Writing keyframes.\" ERROR: " + error_25);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    }); });
}
function rgb2Hsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0, s = 0, v = max;
    var c = max - min;
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
    return [math_util_1.round(h, 3), math_util_1.round(s, 3), math_util_1.round(v, 3)];
}
exports.rgb2Hsv = rgb2Hsv;
/**
 * Convert HSV into RGB.
 * Referenced from :
 * https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 * @param h - Hue value [0, 1].
 * @param s - Saturation [0,1].
 * @param v - Value [0,1].
 * @returns - Object with r, g, b values.
 */
function hsv2Rgb(h, s, v) {
    var r, g, b;
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
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
    r = math_util_1.round(r * 255), g = math_util_1.round(g * 255), b = math_util_1.round(b * 255);
    return { r: r, g: g, b: b };
}
exports.hsv2Rgb = hsv2Rgb;
function hex2Rgb(hex) {
    hex = hex.replace(/[^0-9a-f]/gi, "");
    var r = parseInt(hex[0] + hex[1], 16);
    var g = parseInt(hex[2] + hex[3], 16);
    var b = parseInt(hex[4] + hex[5], 16);
    return { r: r, g: g, b: b };
}
exports.hex2Rgb = hex2Rgb;
function rgb2Hex(r, g, b) {
    var _r = _convertValue2Hex(r);
    var _g = _convertValue2Hex(g);
    var _b = _convertValue2Hex(b);
    return "#" + _r + _g + _b;
}
exports.rgb2Hex = rgb2Hex;
function _convertValue2Hex(v) {
    v = Math.round(v);
    if (v < 0)
        v = 0;
    if (v > 255)
        v = 255;
    var s = v.toString(16);
    if (s.length < 2)
        s = "0" + s;
    return s;
}
/**
 * Lightens / darkens a hexadeciaml color.
 * @param color - Hexadecimal color
 * @param lum - [-1,1] range, -1 being darkest, and 1 brightest.
 * @returns new hexadecimal color.
 */
function colorUtility(color, lum) {
    color = color.replace(/[^0-9a-f]/gi, ""); // get rids of the #
    if (color.length < 6) {
        // 000 => 000000
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    lum = lum || 0;
    var c;
    var result = "#";
    for (var i = 0; i < 3; i += 1) {
        c = parseInt(color.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        result += ("00" + c).substr(c.length);
    }
    return result;
}
exports.colorUtility = colorUtility;
/**
 * Applies "transparency" to the hexadecimal color.
 * @param color - hexadecimal color.
 * @param alpha - alpha value of the color. [0,1] range.
 * @returns a hexadecimal color of length 8 => #RRGGBBAA.
 */
function alphaUtility(color, alpha) {
    color = color.replace(/[^0-9a-f]/gi, "");
    if (color.length < 6) {
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    alpha = alpha || 1;
    var result = "#";
    var a = Math.round(alpha * 255).toString(16).padStart(2, "0");
    return result + color + a;
}
exports.alphaUtility = alphaUtility;
/**
 * Asynchronous helper function that writes data into a file
 * with a WriteStream object.
 * @param ws - WriteStream Object.
 * @param data - String data to write.
 * @returns Promise
 */
function _write(ws, data) {
    return new Promise(function (resolve, reject) {
        ws.write(data, function (err) {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
function _validator(input) {
    if (input === "none")
        return true;
    var rgbRegex = /(rgb)\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/gi;
    var hexRegex = /\#([a-f0-9]{6}|[a-f0-9]{3}|[a-f0-9])\b/gi;
    var invalidHexRegex = /\#([a-z0-9]{4,5}|[a-z0-9]{1,2})\b/gi;
    if (input) {
        var all = input.split(/\s/);
        for (var i = 0; i < all.length; i += 1) {
            if (/^#/.test(all[i])) {
                // Check for invalid hexadecimal input
                var invalidHexArr = all[i].match(invalidHexRegex);
                if (invalidHexArr) {
                    console.log(chalk_1.default.red("Invalid hexadecimal."));
                    return false;
                }
                var validHexArr = all[i].match(hexRegex);
                if (!validHexArr) {
                    console.log(chalk_1.default.red("Invalid hexadecimal."));
                    return false;
                }
            }
            else {
                var validRGB = all[i].match(rgbRegex);
                if (!validRGB) {
                    console.log(chalk_1.default.red("Invalid rgb."));
                    return false;
                }
                var group = void 0;
                while (group = rgbRegex.exec(input)) {
                    if (!_validateRGB(parseInt(group[2]), parseInt(group[3]), parseInt(group[4]))) {
                        console.log(chalk_1.default.red("Invalid rgb."));
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
function _validateRGB(r, g, b) {
    var validRed = (r > -1) && (r < 256);
    var validGreen = (g > -1) && (g < 256);
    var validBlue = (b > -1) && (b < 256);
    return validRed && validGreen && validBlue;
}
function _pathValidator(input) {
    return fs_1.default.existsSync(input);
}
function _answersFilter(answers) {
    var keys = Object.keys(answers);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (key === "extra") {
            var extras = answers[key].split(/\s/);
            extras.map(function (color) {
                var _a;
                if (/^rgb/.test(color)) {
                    var rgbRegex = /(rgb)\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/i;
                    var group = (_a = rgbRegex.exec(color)) !== null && _a !== void 0 ? _a : ["rgb", "1", "1", "1"];
                    var r = parseInt(group[2]);
                    var g = parseInt(group[3]);
                    var b = parseInt(group[4]);
                    return rgb2Hex(r, g, b);
                }
                else {
                    return color;
                }
            });
            answers[key] = extras;
        }
        else {
            var color = answers[key].split(/\s/)[0];
            answers[key] = color;
        }
    }
    return answers;
}
function _themeObjectFactory(answers) {
    var theme = {
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
            btnColorInverse: invert_color_1.default(answers.lightBtnColor),
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
            btnColorInverse: invert_color_1.default(answers.lightBtnColor),
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
    };
    return theme;
}
/**
 * Ask for the necessary colors from the user and prepare theme.
 */
function buildTheme() {
    var questions = [
        {
            type: "input",
            message: "Light Primary:",
            default: "#262626",
            name: "lightPrimary",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Light Background:",
            default: "#fff",
            name: "lightBg",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Light Secondary:",
            default: "#000",
            name: "lightSecondary",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Light Accent:",
            default: "#ef4565",
            name: "lightAccent",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Light Complementary:",
            default: "#3da9fc",
            name: "lightComplementary",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Light Complementary Color:",
            default: "#094067",
            name: "lightComplementaryColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Light Button Color:",
            default: "#3da9fc",
            name: "lightBtnColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Light Border Color:",
            default: "#094067",
            name: "lightBorderColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Light Disabled Color:",
            default: "#bec3cb",
            name: "lightDisabledColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Light Text Color:",
            default: "#5f6c7b",
            name: "lightTextColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Light Headings Color:",
            default: "#094067",
            name: "lightHeadingsColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Light Headings Color:",
            default: "#094067",
            name: "lightHeadingsColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Dark Primary Color:",
            default: "#fff",
            name: "darkPrimary",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Dark Background Color:",
            default: "#16161a",
            name: "darkBg",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Dark Secondary Color:",
            default: "#72757e",
            name: "darkSecondary",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Dark Accent Color:",
            default: "#2cb67d",
            name: "darkAccent",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Dark Complementary:",
            default: "#7f5af0",
            name: "darkComplementary",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Dark Complementary Color:",
            default: "#fffffe",
            name: "darkComplementaryColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Dark Button Color:",
            default: "#7f5af0",
            name: "darkBtnColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Dark Border Color:",
            default: "#94a1b2",
            name: "darkBorderColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Dark Disabled Color:",
            default: "#4b505a",
            name: "darkDisabledColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Dark Text Color:",
            default: "#94a1b2",
            name: "darkTextColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Dark Headings Color:",
            default: "#fffffe",
            name: "darkHeadingsColor",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Extra Colors?:",
            default: "none",
            name: "extra",
            validate: function (input) { return _validator(input); }
        },
        {
            type: "input",
            message: "Save destination:",
            default: "./",
            name: "destination",
            validate: function (input) { return _pathValidator(input); }
        }
    ];
    inquirer_1.prompt(questions)
        .then(function (answers) {
        _build(_themeObjectFactory(_answersFilter(answers)));
    })
        .catch(function (error) {
        console.log(chalk_1.default.red(String(error)));
    });
}
exports.buildTheme = buildTheme;
