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
        clean: ['./dist']
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'copy','webpack:dev']);
};