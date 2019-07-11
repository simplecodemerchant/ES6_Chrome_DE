const { series, src, dest, task, parallel } = require('gulp')
const webpack = require('webpack')
const webpack_config = require('./webpack.config')
const gulp_clean = require('gulp-clean')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const watch = require('gulp-watch')
const zip = require('gulp-zip');

function clean(){
    return src('dist/', {
        read: false,
        allowEmpty: true
    })
        .pipe(gulp_clean())
}

function copy(){
    return src('src/static/*')
        .pipe(dest('dist/'))
}

function pug_dev(){
    return src('src/templates/*.pug')
        .pipe(rename({
            extname: '.html'
        })).pipe(pug())
        .pipe(dest('dist/'));

}

function webpack_dev(mode){
    let config;

    if (mode === 'production'){
        config = Object.assign({mode: 'production'}, webpack_config);
    } else {
        config = Object.assign({mode: 'development'}, webpack_config);
    }

    return new Promise((res, rej) => {
        webpack(config, (err, stats) => {
            if (err){
                return rej(err)
            }
            if (stats.hasErrors()) {
                return rej(new Error(stats.compilation.errors.join('\n')))
            }
            console.log(stats.toString({
                chunks: false,
                colors: true,
            }))
            res()
        })
    })

}

function watcherjs(){
    return watch('src/**/*.js', function(){
        console.log('JS changes...Recompiling')
        webpack_dev()
    })
}

function watchpug(){
    return watch('src/templates/*.pug', function(){
        console.log('Pug changes...Recompiling')
        pug_dev()
    })
}

function watchers(cb){
    return parallel(watcherjs, watchpug)(cb)
}

function zipfiles(cb){
    return src('dist/**')
        .pipe(zip('decipher_shortcuts.zip'))
        .pipe(dest('distzip/'))
}

exports.default = series(
    clean,
    copy,
    pug_dev,
    webpack_dev,
    watchers
)

exports.prod = series(
    clean,
    copy,
    pug_dev,
    webpack_dev,
    zipfiles
)