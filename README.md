# WFrame 
A font-end frame base on grunt & basket.js
## Directory / Files Description

```
/
├
├── assets
│   └── app                 	main develop js / css
│   └── module              	css / js modules, images etc
├
├── deploy
│   └── module.json          	main develop app module define
│   └── version.json         	your app assets version
├
├── dist                   		js / css generate by grunt
├
├── html                      	html generate by grunt
├
├── static                 		basket.js
├
├── views                  		your app develop html, not directly web access
├
├── Gruntfile.js              	                      
├── package.json                
```
## How to Use
check out the [Getting Started](http://gruntjs.com/getting-started) guide
#### Install grunt plugins
```bash
npm install
```
#### Run Grunt with
- for production `grunt`
- for development `grunt dev`

#### An example
you will need a `web server`, visit `/html/app/app.html`

## Introduction
[Basket.js](https://github.com/addyosmani/basket.js/) is a script and resource loader for caching and loading scripts using localStorage. but when we develop app on local environment, js / css assets should not minify and use normal loading mode. grunt concat and watch plugins can do that.

## License
MIT

# WFrame 
一个基于 grunt 和 basket.js 的前端开发部署框架
## 文件说明

```
/
├
├── assets
│   └── app                 	开发 js / css 文件
│   └── module              	相关 js / css 基本模块，方法。一些基本 ui 图片
├
├── deploy
│   └── module.json          	开发所需 js / css 模块定义
│   └── version.json         	开发版本号定义，用于更新
├
├── dist                   		由 grunt 生成的相关 js / css
├
├── html                      	由 grunt 生成的相关 html
├
├── static                 		basket.js
├
├── views                  		开发 html 文件，不能直接 web 访问，访问生成的 html
├
├── Gruntfile.js              	                      
├── package.json                
```
## 开发说明
查看 [安装 grunt](http://gruntjs.com/getting-started) 说明
#### 安装相关 grunt 插件
```bash
npm install
```
#### 相关 grunt 命令
- 线上部署 `grunt`
- 本地开发 `grunt dev`

#### 一个例子
你需要一个本地 `web 服务器`, 然后访问 `/html/app/app.html`

## 说明
[Basket.js](https://github.com/addyosmani/basket.js/) 能够缓存 javascript / css 等一些静态资源到 html5 本地存储，二次访问就可以直接从本地存储获取相关资源而不需要网络请求相关资源。这样可以加快页面速度，降低服务器压力。但是在本地开发时候资源更新很麻烦，所以我们需要最简单的资源加载方式。利用 grunt concat 还有 watch 插件可以做到这样。

## License
MIT


