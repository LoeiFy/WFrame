# WFrame - A font-end frame base on grunt & basket.js

`mobile app(webview)`

- improve performance -- for production : grunt merge minfy js css files and basket.js caches script and css files width localstorage

- develop easy -- for development : js and css files separate and use normal Loading mode

## Directory / File Description

`assets/` ------- your develop js css

`assets/app/` ------- your app js css

`assets/module/` ------- base js css module etc. 

`static/` ------ js plugins，image files, basket.js

`views/` ------- app develop html

`module.json` ------- js css module define, for grunt deploy

`ver.json` ------ app version define


## Grunt Generate Directories Description

`dist/` ------- merge minify js css

`html/` ------- grunt replace minify html or grunt develop html


## A Example

visit： `/html/app/index.html`

- for production ------- `grunt all`

- for development ------- `grunt test`

##### note:

in mobile webview,

you will note that page display without style and then soon with style (blink) if you do not define some css in `assets/module/base.css`

## Power By

`grunt` ------- http://gruntjs.com/

`basket.js` ------- http://addyosmani.github.io/basket.js/

##### P.S

My english is poor

