// return js module path
var resPath = function(path, res) {
    var s = '';
    res = res.replace(/\s/g, '').split(',');
    for (var i = 0; i < res.length; i ++) {
        s += path + res[i] + (i == res.length - 1 ? '' : ',');
    }
    return s.split(',')
}

module.exports = function(grunt) {

    var module = grunt.file.readJSON('deploy/module.json'),         // js modules
        version = grunt.file.readJSON('deploy/version.json');       // version

    grunt.initConfig({

        // merge minify js
        uglify: {

            options: {
                banner: '/** @preserve Copyright ... All Rights Reserved.*/\n'
            },

            app: {
                files: {
                    'dist/app/app.js': resPath('assets/module/js/', module.js.app).concat('assets/app/app.js')
                }
            }

        },


        // merge minify css
        cssmin: {

            app: {

                options: {
                    banner: '/** @preserve Copyright ... All Rights Reserved. */\n'
                },

                files: {
                    'dist/app/app.css': resPath('assets/module/css/', module.css.app).concat('assets/app/app.css')
                }
            }

        },

        // merge css and js
        concat: {

            js: {

                files: {
                    'dist/app/app.js': resPath('assets/module/js/', module.js.app)
                }

            },

            css: {

                files: {
                    'dist/app/app.css': resPath('assets/module/css/', module.css.app)
                }

            }

        },

        // replace string
        replace: {

            app: {
                options: {
                    patterns: [{json: version}, {match: 'style', replacement: '<%= grunt.file.read("assets/module/css/base.css") %>'}]
                },
                files: [{
                    expand: true, 
                    cwd: 'views/app/',
                    src: '*.html', 
                    dest: 'html/temp/app/'
                }]
            }

        },

        // process test html
        processhtml: {

            app: {
                files: [{
                    expand: true,
                    cwd: 'html/temp/app/',
                    src: '*.html',
                    dest: 'html/app/'
                }]
            }

        },

        // minify html
        htmlmin: {

            app: {

                options: {
                    removeComments: true, 
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },

                files: [{
                    expand: true,
                    cwd: 'html/temp/app/',
                    src: '*.html',
                    dest: 'html/app/'
                }]

            }

        },

        // watch
        watch: {

            js: {
                files: 'assets/module/js/*.js',
                tasks: ['concat:js']
            },

            css: {
                files: 'assets/module/css/*.css',
                tasks: ['concat:css']
            },

            html: {
                files: ['views/app/*.html', 'assets/module/css/base.css'],
                tasks: ['replace', 'processhtml']
            }

        },

        // jshint
        jshint: {
            options: {asi: true},
            all: ['Gruntfile.js', 'assets/app/*.js', 'assets/module/js/*.js']
        }

    });

    // grunt plugin
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // for production 
    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'replace', 'htmlmin']);

    // for development
    grunt.registerTask('dev', ['jshint', 'concat', 'replace', 'processhtml','watch']);
};
