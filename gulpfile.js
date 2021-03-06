var gulp = require('gulp'),
    fs = require('fs'),
    fileinclude = require('gulp-file-include'),
    jsmin = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    replace = require('gulp-replace-task'),
    map = require('map-stream'),
    jshint = require('gulp-jshint'),
    insert = require('gulp-insert'),
    RevAll = require('gulp-rev-all'),
    gulpif = require('gulp-if');

// define dev: $ mode=dev gulp
var env = process.env.mode;

gulp.task('js', function() {
    if (env === 'dev') {
        var revAll = new RevAll({fileNameManifest: 'js.json', dontRenameFile: ['.js']});
    } else {
        var revAll = new RevAll({fileNameManifest: 'js.json', hashLength: 32});
    }
    return gulp.src(['assets/*/*.js', '!assets/modules/*.js'])
        .pipe(fileinclude({
            basepath: 'assets/modules/'
        }))
        .pipe(gulpif(env !== 'dev', jsmin()))
        .pipe(revAll.revision())
        .pipe(gulp.dest('dist/'))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest('dist/'))
})

gulp.task('css', function() {
    if (env === 'dev') {
        var revAll = new RevAll({fileNameManifest: 'css.json', dontRenameFile: ['.css']});
    } else {
        var revAll = new RevAll({fileNameManifest: 'css.json', hashLength: 32});
    }
    gulp.src(['assets/*/*.css', '!assets/modules/*.css'])
        .pipe(fileinclude({
            basepath: 'assets/modules/'
        }))
        .pipe(gulpif(env !== 'dev', cssmin()))
        .pipe(revAll.revision())
        .pipe(gulp.dest('dist/'))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest('dist/'))
})

gulp.task('jshint', ['js'], function() {
    if (env !== 'dev') return;

    return gulp.src(['dist/*/*.js', '!dist/*/*.*.js'])
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

gulp.task('replace', ['js', 'css'], function() {
    gulp.src(['templates/*/*.html', '!templates/modules/*.html'])
        .pipe(replace({
            patterns: [
                { json: JSON.parse(fs.readFileSync('dist/css.json')) },
                { json: JSON.parse(fs.readFileSync('dist/js.json')) }
            ]
        }))
        .pipe(fileinclude({
            basepath: 'templates/modules/'
        }))
        .pipe(gulpif(env !== 'dev', htmlmin({
            removeComments: true, 
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('html/'))
})

gulp.task('watch', ['jshint', 'css', 'replace'], function() {
    if (env !== 'dev') return;

    var js = gulp.watch('assets/*/*.js', ['jshint']);
    js.on('change', function(e) { log(e) })

    var css = gulp.watch('assets/*/*.css', ['css']);
    css.on('change', function(e) { log(e) })

    var html = gulp.watch('templates/*/*.html', ['replace']);
    html.on('change', function(e) { log(e) })

    function log(e) { console.log('File ' + e.path + ' was ' + e.type + ', running tasks...') }
})

gulp.task('default', ['jshint', 'css', 'replace', 'watch'])
