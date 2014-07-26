module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/build/<%= pkg.name %>.js',
                dest: 'js/build/<%= pkg.name %>.min.js'
            }
        },
        sass: {
            primary: {
                files: {
                    "assets/css/main.css": "assets/sass/main.scss"
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'js/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            css: {
                files: [
                    'assets/sass/lib/*/*.scss',
                    'assets/sass/control-panel/*.scss',
                    'assets/sass/*/*.scss',
                    'assets/sass/*.scss',
                ],
                tasks: ['sass:primary']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['sass:primary']);
};
