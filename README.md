# NS7 Theme Builder CLI
### Instalation
`npm i -g ns-7-theme-builder`

Build custom css theme for nativescript 7+ angular components.
## CLI Commands & Options
|  Command | Usage  | Description|
| :------------: | :------------: |:-----------:|
|  b, build | nstheme build | Initializes the cli to build a custom theme. The cli will ask for the neccessary colors (hexadecimal or rgb) to build the theme.|

------------

|Option|Usage|Descript
|:--:|:--:|:--:|
|-v, --version|nsthem --version|Gets the version of the cli|
|-h, --help|nstheme --help|Gets documentation on all commands & options available.|
## Issues
If you have found a possible bug, please use the issues option on this repo to report the problem. Please include a way to reproduce the error.

------------

##### Known Issues
- Global light/dark variables are not being set when custom theme is building. One would need to declare the primary, secondary and accent colors for light/dark mode themselves. This causes a problem when building custom components that do not use nativescript component directives but still want the same theme.
- Button component text color for light theme is not accurately generated causing the contrast to be minimal. Overall, the ui looks less readable and affects user experience.
