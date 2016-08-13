var path = require('path');
module.exports = function(grunt) {
    grunt.config.init({
        bannerInfo: '                                                               \n' +
        '/*                                                                         \n' +
        '|------------------------------------------------------------------------- \n' +
        '| Created info                                                             \n' +
        '|------------------------------------------------------------------------- \n' +
        '|                                                                          \n' +
        '| Developer: Andrew Dyachenko                                              \n' +
        '| Date:      8 января 2015                                                 \n' +
        '| Email:     cccp.world@gmail.com                                          \n' +
        '| Skype:     tux_will                                                      \n' +
        '| Phone:     +7(923) 337-34-58                                             \n' +
        '|                                                                          \n' +
        '|------------------------------- «Microblog» ----------------------------- \n' +
        '|                                                                          \n' +
        '*/                                                                         \n',

        realFavicon: {
            favicons: {
                src: 'assets/images/master-favicon.png',
                dest: 'favicon/',
                options: {
                    iconsPath: 'favicon/',
                    html: [ 'favicon.php' ],
                    design: {
                        ios: {
                            pictureAspect: 'backgroundAndMargin',
                            backgroundColor: '#ffffff',
                            margin: '28%'
                        },
                        desktopBrowser: {},
                        windows: {
                            pictureAspect: 'noChange',
                            backgroundColor: '#ffc40d',
                            onConflict: 'override'
                        },
                        androidChrome: {
                            pictureAspect: 'noChange',
                            themeColor: '#3c3c3c',
                            manifest: {
                                name: 'Grocery market',
                                display: 'browser',
                                orientation: 'notSet',
                                onConflict: 'override',
                                declared: true
                            }
                        },
                        safariPinnedTab: {
                            pictureAspect: 'silhouette',
                            themeColor: '#5bbad5'
                        }
                    },
                    settings: {
                        scalingAlgorithm: 'Mitchell',
                        errorOnImageTooSmall: false
                    }
                }
            }
        },

        jshint: {
            files: ['assets/js/*.js', 'js/main.js']
        },

        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/js/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dist/js/',
                    ext: ['.min.js']
                }]
            }
        },

        less: {
            production: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'common.css.map',
                    sourceMapFilename: 'dist/css/common.css.map'
                },
                src: ['assets/less/common.less'],
                dest: 'dist/css/common.css'
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: [
                            '> 11%',
                            'Chrome >= 10',
                            'Explorer >= 6',
                            'Opera >= 11',
                            'Firefox >= 3.5',
                            'Safari >= 4',
                            'iOS >= 6'
                        ],
                        remove: true
                    })
                ]
            },
            dist: {
                src: ['dist/css/*.css', '!dist/css/*.min.css', '!/dist/css/*.css.map']
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css/',
                    src: ['*.css', '!*.min.css', '!*.css.map'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            },
            options: {
                // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
                compatibility: 'ie8',
                keepSpecialComments: '*',
                sourceMap: true,
                advanced: false
            }
        },

        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/',
                        src: ['fonts/**'],
                        dest: 'dist/'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/',
                        src: ['images/**'],
                        dest: 'dist/',
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/js/',
                        src: ['*.js', '!*.min.js'],
                        dest: 'dist/js/'
                    }
                ]
            },
            bootstrapVariables: {
                files: [
                    {
                        expand: true,
                        cwd: '/bower_components/bootstrap/less/',
                        src: ['variables.less'],
                        dest: '/bower_components/bootstrap/less/',
                        ext: '.bak'
                    }
                ]
            }
        },

        symlink: {
            makeLink: {
                options: {
                    overwrite: false
                },
                target: '' + path.resolve() + '/bower_components/bootstrap/less/variables.less',
                link: '' + path.resolve() + '/assets/less/variables.less'
            },
            mixins: {
                options: {
                    overwrite: true
                },
                link: '' + path.resolve() + '/assets/less/bootstrap',
                target: '' + path.resolve() + '/bower_components/bootstrap/less/'
            }
        },

        watch: {
            options: {
                livereload: true
            },
            less: {
                files: ['assets/less/*.less', '!assets/less/variables.less'],
                tasks: ['less', 'postcss', 'cssmin', 'clean:minMap', 'usebanner:css']
            },
            js: {
                files: '<%= jshint.files %>',
                tasks: ['jshint', 'uglify', 'copy:js', 'usebanner:js']
            },
            images: {
                files: ['assets/images/*'],
                tasks: ['copy:images']
            },
            fonts: {
                files: ['assets/fonts/**'],
                tasks: ['copy:fonts']
            }
        },

        usebanner: {
            options: {
                position: 'top',
                banner: '<%= bannerInfo %>',
                linebreak: true
            },
            css: {
                files: {
                    src: ['dist/css/*.css', '!dist/css/*.css.map']
                }
            },
            js: {
                files: {
                    src: ['dist/js/**']
                }
            }
        },

        clean: {
            dist: ['dist/'],
            minMap: ['dist/css/*.min.css.map']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-symbolic-link');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-real-favicon');

    grunt.registerTask('newerCopy', ['newer:copy']);
    grunt.registerTask('deploy', ['copy:bootstrapVariables', 'symlink:makeLink', 'symlink:mixins', 'realFavicon']);
    grunt.registerTask('default', ['clean:dist', 'jshint', 'uglify', 'less', 'postcss', 'cssmin', 'clean:minMap', 'newerCopy', 'usebanner', 'watch']);
};  