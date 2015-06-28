
var gulp = require('gulp'),
    version = require('./version.json'),
    fileinclude = require('gulp-file-include'),
    jsmin = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    replace = require('gulp-replace-task'),
    map = require('map-stream'),
    jshint = require('gulp-jshint'),
    insert = require('gulp-insert'),
    gulpif = require('gulp-if');

// define dev: $ mode=dev gulp
var env = process.env.mode;

gulp.task('js', function() {
    return gulp.src(['assets/*/*.js', '!assets/module/*.js'])
        .pipe(fileinclude({
            basepath: 'assets/module/'
        }))
        .pipe(gulpif(env !== 'dev', jsmin()))
        .pipe(gulp.dest('dist/'))
})

gulp.task('jshint', ['js'], function() {
    if (env !== 'dev') return;

    return gulp.src('dist/*/*.js')
        .pipe(jshint({ asi: true }))
        .pipe(map(function(file, cb) {
            if (!file.jshint.success) {
                file.jshint.results.forEach(function (e) {
                    if (e) {
                        var f = file.path;
                        e = e.error;
                        f = f.substring(f.indexOf('dist'), f.length);
                        var s = e.id +' '+ f +': line '+ e.line +', col '+ e.character +','+ e.evidence +' , '+ e.reason;

                        var d;
                        for (var i = f.indexOf('/'); i > 0; i = f.indexOf('/', i + 1)) {
                            d = i
                        }
                        gulp.src(f).pipe(insert.prepend('alert("'+ s +'")')).pipe(gulp.dest(f.substring(0, d + 1)))
                    }
                })
            }
            cb(null, file)
        }))
})

gulp.task('javascript', ['js', 'jshint'])

gulp.task('css', function() {
    gulp.src(['assets/*/*.css', '!assets/module/*.css'])
        .pipe(fileinclude({
            basepath: 'assets/module/'
        }))
        .pipe(gulpif(env !== 'dev', cssmin()))
        .pipe(gulp.dest('dist/'))
})

gulp.task('html', function() {
    gulp.src(['views/*/*.html', '!views/module/*.html'])
        .pipe(replace({
            patterns: [{
                json: version
            }]
        }))
        .pipe(fileinclude({
            basepath: 'views/module/'
        }))
        .pipe(gulpif(env !== 'dev', htmlmin({
            removeComments: true, 
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('html/'))
})

gulp.task('watch', ['javascript', 'css', 'html'], function() {
    if (env !== 'dev') return;

    var js = gulp.watch('assets/*/*.js', ['javascript']);
    js.on('change', function(event) { log(event) })

    var css = gulp.watch('assets/*/*.css', ['css']);
    css.on('change', function(event) { log(event) })

    var html = gulp.watch('views/*/*.html', ['html']);
    html.on('change', function(event) { log(event) })

    function log(e) { console.log('File ' + e.path + ' was ' + e.type + ', running tasks...') }
})

gulp.task('default', ['javascript', 'css', 'html', 'watch'])
