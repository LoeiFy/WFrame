# WFrame 
A font-end frame base on gulp. (and liveReload, weinre )
## Directory / Files Description

```
/
├
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