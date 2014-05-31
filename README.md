## 目录/文件说明

assets/             开发js，css文件
----app/            项目主体js
----module/         js组件，基本js方法，css块

static/             js库，图片存放目录（basket基础文件也是在这个目录）

views/              开发html文件

module.json         相关js组件，对应 assets/module/js/

ver.json            版本号定义


## 生成目录/文件说明

dist/               压缩合并后的js，css文件

html/               grunt替换压缩后的html文件

test/               测试环境使用的html文件

说明：html/ , test/ 目录下html只是引用文件路径的不同，效果是一样的，test/是方便快速调试，修改js，css直接生效。
html/用到了localstorage，不修改版本号就不会有新的请求，所以改动的css，js不会即时生效


## 相关 grunt 插件（具体看 package.json）

"grunt-contrib-uglify": "~0.4.0"        js 压缩
"grunt-contrib-cssmin": "~0.9.0"        css 压缩
"grunt-contrib-htmlmin": "~0.2.0"       html 压缩
"grunt-replace": "~0.7.7"               替换定义的字符串
"grunt-processhtml": "~0.3.3"           生成相关 html 块


## 例子说明

正式环境访问： /html/app/index.html
测试环境访问： /test/app/index.html

grunt all 生成app正式环境使用的html，js，css ('uglify:app', 'cssmin:css', 'replace:app', 'htmlmin:app')
生成的 html: html/app/index.html
       css:  dist/css/app.css   由 assets/module/css/global.css 压缩生成
       js:   dist/app/index.js  由 assets/module/js/base.js, assets/module/js/touch.js, assets/app/index.js 合并压缩生成

grunt test 生成app测试使用的html ('processhtml:app')

文件说明： /assets/module/css/base.css 这个css会经过grunt替换写入正式环境index.html, 因为basket的执行可能慢于页面的呈现，这时候页面会出现无样式情况，然后应用样式，页面就出现闪烁，所以预先定义某部分css，隐藏某部分内容，当css 完全 append 到页面才显示其他内容
（注：闪烁问题在手机上明显，但是pc上几乎看不到）
