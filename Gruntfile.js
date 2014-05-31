module.exports = function(grunt) {

    grunt.initConfig({

        ver     : grunt.file.readJSON('ver.json'),
        module  : grunt.file.readJSON('module.json'),

        // 压缩js文件
        uglify: {

            app: {
                files: {
                    'dist/app/index.js': [
                        '<%= module.base %>',
                        '<%= module.touch %>',
                        'assets/app/index.js'
                    ]
                }
            }

        },


        // 合并压缩css文件
        cssmin: {

            app: {
                files: {
                    'dist/css/global.css': [
                        '<%= module.css %>',
                        'assets/app/index.css'
                    ]
                }
            }

        },

        // 替换版本号
        replace: {

            app: {
                options: {
                    patterns: [
                        {
                            match: 'style',
                            replacement: '<%= grunt.file.read("assets/module/css/base.css") %>'
                        },
                        {
                            match: 'zepto',
                            replacement: '<%= ver.zepto %>'
                        },
                        {
                            match: 'css',
                            replacement: '<%= ver.css %>'
                        },
                        {
                            match: 'index',
                            replacement: '<%= ver.app.index %>'
                        }
                    ]
                },
                files: [
                    { expand: true, flatten: true, src: ['views/app/*'], dest: 'html/tmp/app/' }
                ]
            }

        },

        // 压缩html
        htmlmin: {

            app: {

                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },

                files: {
                    'html/app/index.html': 'html/tmp/app/index.html'
                }

            }

        },

        // 测试html
        processhtml: {

            app: {
                files: {
                    'test/app/index.html': ['views/app/index.html']
                }
            }

        }

    });


    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-processhtml');

    // 正式环境使用 all 任务包含全部生成任务
    grunt.registerTask('app', ['uglify:app']);
    grunt.registerTask('css', ['cssmin:app']);
    grunt.registerTask('html', ['replace:app', 'htmlmin:app']);
    grunt.registerTask('all', ['uglify:app', 'cssmin:app', 'replace:app', 'htmlmin:app']);

    // 测试环境使用
    grunt.registerTask('test', ['processhtml:app']);
};
