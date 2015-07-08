# WFrame 
A font-end frame base on gulp. (and liveReload, weinre )
## Directory / Files Description

```
├── assets                 develop assets
│   └── app                your app
│   └── modules            css / js modules
├
├── dist                   js / css generate by gulp
├
├── html                   html generate by gulp
├
├── templates              develop html
│   └── app                your app
│   └── modules            html modules
├
├── gulpfile.js              	                      
├── package.json                
```
## How to Use
Install gulp [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

```bash
sudo npm i gulp -g
npm install
```

### Optional
- weinre for mobile debug.
- liveReload for refresh page when files change.

```bash
sudo npm i weinre -g
```

Get chrome extension [livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

```bash
sudo npm i livereload -g
```

### demo

```bash
cd WFrame
npm install
```

- for production `gulp`
- for development `mode=dev gulp`

need a web server, visit:

`http://.../html/app/app.html`

## Introduction
### Define js / css / html modules, and your app can include them 

js:

```js
// js module: a.js

var @@def = function(s) {
	//...
	return s
}
```

```js
// your app: app.js

@@include('a.js', {"def": "a"})		// just like: var a = ... 

document.addEventListener('DOMContentLoaded', function() {
    a('some')	// we have define 'a' first
})
```

and the result is:

```js
// app.js (no compressed)

var a = function(s) {
	//...
	return s
}

document.addEventListener('DOMContentLoaded', function() {
    a('some')
})
```

css:

```css
/* css module: b.css */

#some {
	...
}
```
```css
/* your app: app.css */

@@include('b.css')
.tag {
	...
}
```
and the result is:

```css
/* app.css (no compressed) */

#some {
	...
}
.tag {
	...
}
```

html:

```html
<!-- header.html -->

<meta charset="utf-8" />
<title>@@title</title>
<meta name="format-detection" content="telephone=no; date=no; address=no; email=no">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet" href="@@css" />
```

```html
<!-- footer.html -->

<script src="@@js"></script>
```

```html
<!-- app.html -->

<!doctype html>
<html>
<head>

@@include('header.html', {
    "title": "APP DEMO",
    "css": "@@/dist/app/app.css"
})

</head>
<body>

<h1>touch or hover to change color</h1>
<div class="app"></div>
<div class="app"></div>
<div class="app"></div>

@@include('footer.html', {
    "js": "@@/dist/app/app.js"
})
</body>
</html>
```

and the result is:

```html
<!doctype html>
<html>
<head>

<meta charset="utf-8" />
<title>APP DEMO</title>
<meta name="format-detection" content="telephone=no; date=no; address=no; email=no">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet" href="/dist/app/app.css" />


</head>
<body>

<h1>touch or hover to change color</h1>
<div class="app"></div>
<div class="app"></div>
<div class="app"></div>

<script src="/dist/app/app.js"></script>

</body>
</html>
```

### Generate assets MD5 version automatic

```html
<!-- app.css MD5 timestamp --> 
<link rel="stylesheet" href="/dist/app/app.css?9a8bd5e6fd21c883e0c5e3ab7e37a171">

<!-- app.js MD5 timestamp -->
<script src="/dist/app/app.js?0103f9dcd3e1493452f217064e17f12e"></script>
```

### Jshint error automatic reminders

When jshint error occurs, it will prepend error infomations on your main js file automatic

```js
alert("(error) dist/app/app.js: line 59, col 18, if (i = 5) { , Expected a conditional expression and instead saw an assignment.")
// app.js
...
```

### Compress js / css assets and html

It will generate js, css, html min file for production deploy

### Automatic generate development files

When run `mode=dev gulp`, it will generate your files and check js errors automatic

### Other features

- `liveReload` monitors changes in the file system. As soon as you save a file, it is preprocessed as needed, and the browser is refreshed. 

install chrome extension [livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) first

```bash
cd WFrame
livereload dist html
```

- `weinre` for mobile dubug

```bash
# configure weinre host
weinre --boundHost [your ip]
```

```js
// an example: define a debug module

var i = 0;
$('id').on('click', function() {
	i ++;
    if (i == 5) {
    	i = 0;

        var ip = prompt('your ip', '');
        if (!ip) return;

        var e = document.createElement('script');
        e.setAttribute('src', 'http://'+ ip +':8080/target/target-script-min.js')
        document.getElementsByTagName('body')[0].appendChild(e)
    }
})
```
now your can debug your mobile app:

`http://[your ip]:8080/client/#anonymous`

## License
MIT

# 中文

## 文件说明

```
├── assets                 develop assets
│   └── app                your app
│   └── modules            css / js modules
├
├── dist                   js / css generate by gulp
├
├── html                   html generate by gulp
├
├── templates              develop html
│   └── app                your app
│   └── modules            html modules
├
├── gulpfile.js              	                      
├── package.json                
```

## 使用

安装 gulp

```bash
sudo npm i gulp -g
npm install
```

可选安装

- weinre 用于移动设备调试.
- liveReload 用于自动刷新开发页面.

```bash
sudo npm i weinre -g
```

先安装 chrome extension [livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

```bash
sudo npm i livereload -g
```

## 项目 DEMO 

```bash
cd WFrame
npm install
```

- 线上部署命令 `gulp`
- 开发命令 `mode=dev gulp`

需要一个本地 web 服务器，访问:

`http://.../html/app/app.html`

## 特色

### 1.可以定义 js / css / html 模块，然后在需要的地方引用

ps：对于项目模块化，我的想法是本地开发模块化组件是必要的，但是不应该线上客户端用来加载依赖，应该由本地开发部署时候就完成依赖合并打包

js:

```js
// js 模块 a: a.js

var @@def = function(s) {
	//...
	return s
}
```

```js
// 开发 app: app.js

@@include('a.js', {"def": "a"})		// 等同于: var a = ... 

document.addEventListener('DOMContentLoaded', function() {
    a('some')	// a 已经定义
})
```

经过 gulp 处理:

```js
// app.js (未压缩)

var a = function(s) {
	//...
	return s
}

document.addEventListener('DOMContentLoaded', function() {
    a('some')
})
```

css:

```css
/* css 模块 b: b.css */

#some {
	...
}
```
```css
/* 开发 app: app.css */

@@include('b.css')
.tag {
	...
}
```
经过 gulp 处理:

```css
/* app.css (未压缩) */

#some {
	...
}
.tag {
	...
}
```

html:

```html
<!-- 模块：header.html -->

<meta charset="utf-8" />
<title>@@title</title>
<meta name="format-detection" content="telephone=no; date=no; address=no; email=no">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet" href="@@css" />
```

```html
<!-- 模块：footer.html -->

<script src="@@js"></script>
```

```html
<!-- 开发 html：app.html -->

<!doctype html>
<html>
<head>

@@include('header.html', {
    "title": "APP DEMO",
    "css": "@@/dist/app/app.css"
})

</head>
<body>

<h1>touch or hover to change color</h1>
<div class="app"></div>
<div class="app"></div>
<div class="app"></div>

@@include('footer.html', {
    "js": "@@/dist/app/app.js"
})
</body>
</html>
```

经过 gulp 处理:

```html
<!doctype html>
<html>
<head>

<meta charset="utf-8" />
<title>APP DEMO</title>
<meta name="format-detection" content="telephone=no; date=no; address=no; email=no">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet" href="/dist/app/app.css" />


</head>
<body>

<h1>touch or hover to change color</h1>
<div class="app"></div>
<div class="app"></div>
<div class="app"></div>

<script src="/dist/app/app.js"></script>

</body>
</html>
```

### 2.可以自动生成 MD5 版本号

```html
<!-- app.css MD5 timestamp --> 
<link rel="stylesheet" href="/dist/app/app.css?9a8bd5e6fd21c883e0c5e3ab7e37a171">

<!-- app.js MD5 timestamp -->
<script src="/dist/app/app.js?0103f9dcd3e1493452f217064e17f12e"></script>
```

### 3.自动添加 jshint 出错信息提醒

当 jshint 检测出错，会自动在主体开发 js 文件上添加一句 alert 信息提醒出错

```js
alert("(error) dist/app/app.js: line 59, col 18, if (i = 5) { , Expected a conditional expression and instead saw an assignment.")
// app.js
...
```

### 4.自动压缩 js / css 资源，还有 html

线上部署产生对应文件压缩版本

### 5.自动合并产生开发文件

运行 `mode=dev gulp`, 当修改相应 js css 模块或者 html，都会自动产生最终开发文件并检查 js 是否有问题

### 6.其他

- 安装 `liveReload` 自动刷新页面

必须安装 chrome extension [livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) 

```bash
cd WFrame
# 检测 dist，html 目录的文件变化，然后自动刷新页面
livereload dist html
```

- `weinre` 用于远程调试移动端页面

```bash
# 主机上运行
weinre --boundHost [your ip]
```

```js
// 一个例子：项目中引用 js

var i = 0;
$('id').on('click', function() {
	i ++;
    if (i == 5) {
    	i = 0;

        var ip = prompt('your ip', '');
        if (!ip) return;

        var e = document.createElement('script');
        e.setAttribute('src', 'http://'+ ip +':8080/target/target-script-min.js')
        document.getElementsByTagName('body')[0].appendChild(e)
    }
})
```
现在，可以远程调试了，访问:

`http://[your ip]:8080/client/#anonymous`

## License
MIT