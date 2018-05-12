var webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        webpack: {
            prod: Object.assign({
                    mode: 'production'
                }, webpackConfig),
            dev: Object.assign({
                    watch: true,
                    mode: 'development'
                }, webpackConfig)
        },
        copy: {
            main: {
                files: [
                    { expand: true, src: ['src/static/*'], dest: 'dist/', flatten: true }
                ]
            }
        },
        clean: ['./dist'],
        pug: {
            default : {
                options: {
                    debug: true
                },
                files: {
                    'dist/options.html': 'src/templates/options.pug'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-pug');

    grunt.registerTask('default', ['clean', 'copy', 'pug:default', 'webpack:dev']);
    grunt.registerTask('prod', ['clean', 'copy','webpack:prod']);
};