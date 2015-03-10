# WFrame 
A font-end frame base on grunt & basket.js
### Directory / Files Description

```
/
├
├── assets
│   └── app                 	main develop js / css
│   └── module              	css / js modules, images etc
├
├── deploy
│   └── module.json          	main develop app module define
│   └── version.json          	your app assets version
├
├── dist                   		js / css generate by grunt
├
├── html                      	html generate by grunt
├
├── static                    	basket.js
├
├── views                     	your app develop html, not directly web access
├
├── Gruntfile.js              	                      
├── package.json                
```
### How to Use
check out the [Getting Started](http://gruntjs.com/getting-started) guide
#### Install grunt plugins
```bash
npm install grunt --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-contrib-cssmin --save-dev
npm install grunt-contrib-htmlmin --save-dev
npm install grunt-processhtml --save-dev
npm install grunt-contrib-concat --save-dev
npm install grunt-replace --save-dev
npm install grunt-contrib-watch --save-dev
npm install grunt-contrib-jshint --save-dev
```
#### Run Grunt with
- for production ------- `grunt`
- for development ------- `grunt dev`

#### next
you will need a `web server`, visit `/html/app/app.html`

### Introduction
[Basket.js](https://github.com/addyosmani/basket.js/) is a script and resource loader for caching and loading scripts using localStorage. but when we develop app on local environment, js / css assets should not minify and use normal loading mode. grunt concat and watch plugins can do that.

### License
MIT


