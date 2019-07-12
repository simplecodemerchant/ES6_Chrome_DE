const { series, src, dest, task, parallel } = require('gulp')
const webpack = require('webpack')
const webpack_config = require('./webpack.config')
const gulp_clean = require('gulp-clean')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const watch = require('gulp-watch')
const zip = require('gulp-zip');

function clean(folder){
    return src(folder, {
        read: false,
        allowEmpty: true
    })
        .pipe(gulp_clean())
}
const clean_dev = () => clean('dist/');
const clean_prod = () => clean('distzip/');

function copy(){
    return src('src/static/*')
        .pipe(dest('dist/'))
}

function pug(){
    return src('src/templates/*.pug')
        .pipe(rename({
            extname: '.html'
        })).pipe(pug())
        .pipe(dest('dist/'));

}

function webpacker(mode){
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

function webpack_dev(){
    return webpacker('development')
}
function webpack_prod(){
    return webpacker('production')
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
    clean_dev,
    copy,
    pug,
    webpack_dev,
    watchers
)

exports.prod = series(
    clean_dev,
    clean_prod,
    copy,
    pug,
    webpack_prod,
    zipfiles
)