var bannerInfo = '                                                              \n' +
    '/*                                                                         \n' +
    '|------------------------------------------------------------------------- \n' +
    '| Created info                                                             \n' +
    '|------------------------------------------------------------------------- \n' +
    '|                                                                          \n' +
    '| Developer: Andrew Dyachenko                                              \n' +
    '| Date:      ' + Date() + '                                                \n' +
    '| Email:     cccp.world@gmail.com                                          \n' +
    '| Skype:     tux_will                                                      \n' +
    '| Phone:     +7(923)337-34-58                                              \n' +
    '|                                                                          \n' +
    '|--------------------------- Special for «Embria» ------------------------ \n' +
    '|                                                                          \n' +
    '*/                                                                         \n' ;
var path = require('path');
module.exports = function(grunt) {

    grunt.initConfig({

        jshint: {
            files: ['assets/js/*.js', 'js/main.js']
        },

        uglify: {
            minified: {
                files: [{
                    expand: true,
                    cwd: 'assets/js/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dist/js/',
                    ext: ['.min.js']
                }]
            }
        },

        sprite:{
            all: {
                src: 'assets/images/sprite/*.{png, jpg, gif, bnp}',
                dest: 'dist/images/sprite/sprite.png',
                cssFormat: 'css',
                destCss: 'dist/css/sprite.css',
                cssOpts: {
                    cssSelector: function (item) {
                        if (item.name.indexOf('-hover') !== -1) {
                            return '.spriteSmith:hover .icon-' + item.name.replace('-hover', '');
                        }
                        else if (item.name.indexOf('-active') !== -1) {
                            return '.spriteSmith:active .icon-' + item.name.replace('-active', '') + ',' + '\n' + '.spriteSmith.active .icon-' + item.name.replace('-active', '');
                        }
                        else if (item.name.indexOf('-focus') !== -1) {
                            return '.spriteSmith:focus .icon-' + item.name.replace('-focus', '');
                        }
                        else {
                            return '.spriteSmith .icon-' + item.name;
                        }
                    }
                }
            }
        },

        less: {
            production: {
                options: {
                    sourceMap: true,
                    paths: ['dist/css'],
                    compress: false,
                    plugins: [
                        require('less-plugin-glob')
                    ]
                },
                files: {
                    'dist/css/common.css': ['assets/less/common.less', '!assets/less/variables.less']
                }
            }
        },

        postcss: {
            options: {
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
                src: ['dist/css/*.css', '!dist/css/*.min.css']
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
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
                        src: ['images/**', '!images/sprite/**'],
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
            }
        },

        rename: {
            main: {
                files: [
                    {
                        src: 'bower_components/bootstrap/less/variables.less', 
                        dest: 'bower_components/bootstrap/less/variables.less.bak'
                    },
                ]
            }
        },

        symlink: {
            makeLink: {
                options: {
                    overwrite: false
                },
                target: '' + path.resolve() + '/assets/less/variables.less',
                link: 'bower_components/bootstrap/less/variables.less'
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
                tasks: ['less', 'postcss', 'concat', 'cssmin', 'usebanner:css']
            },
            js: {
                files: '<%= jshint.files %>',
                tasks: ['jshint', 'uglify', 'copy:js', 'usebanner:js']
            },
            sprite: {
                files: ['assets/images/sprite/**'],
                tasks: ['sprite', 'less', 'postcss', 'concat', 'cssmin', 'usebanner:css']
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

        concat: {
            options: {
                separator: '\n'
            },
            sprite: {
                src: ['dist/css/sprite.css', 'dist/css/common.css'],
                dest: 'dist/css/common.css'
            }
        },

        usebanner: {
            options: {
                position: 'top',
                banner: bannerInfo,
                linebreak: true
            },
            css: {
                files: {
                    src: ['dist/css/**']
                }
            },
            js: {
                files: {
                    src: ['dist/js/**']
                }
            }
        },

        usebanner: {
            options: {
                position: 'top',
                banner: bannerInfo,
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
        clean: ['dist/']
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-symbolic-link');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('newerCopy', ['newer:copy']);
    grunt.registerTask('default', ['clean', 'jshint', 'uglify', 'sprite', 'symlink:mixins', 'less', 'postcss', 'concat', 'cssmin', 'newerCopy', 'rename', 'symlink:makeLink', 'usebanner', 'watch']);
};