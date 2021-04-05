# NS7 Theme Builder CLI
### Instalation
`npm i -g ns-7-theme-builder`

Build custom css theme for nativescript 7+ angular components.<br/>
**NOTE: The generated css file is meant to be used in conjunction with nativescript core theme.**

### Install Nativescript Core Theme
`npm install @nativescript/theme --save`

After the installation, import the core theme in you app.css and the generated css file.
```css
@import '~@nativescript/theme/css/core.css';
@import '~@nativescript/theme/css/custom.css';
```
For more information, visit [Nativescript official documentation](https://docs.nativescript.org/angular/ui/theme).

## CLI Commands & Options
|  Command | Usage  | Description|
| :------------: | :------------: |:-----------:|
|  b, build | nstheme build | Initializes the cli to build a custom theme. The cli will ask for the neccessary colors (hexadecimal or rgb) to build the theme.|

------------

|Option|Usage|Descript
|:--:|:--:|:--:|
|-v, --version|nstheme --version|Gets the version of the cli|
|-h, --help|nstheme --help|Gets documentation on all commands & options available.|
## Issues
If you have found a possible bug, please use the issues option on this repo to report the problem. Please include a way to reproduce the error.

------------

##### Known Issues
- It seems that using #RRGGBBAA does not work well in Nativescript. The alpha value does not apply correctly. Trying to add RGBA to the theme builder.
