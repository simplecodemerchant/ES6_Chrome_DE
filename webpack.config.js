const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'index': path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /.js$/,   use: 'babel-loader', exclude: /(node_modules)/},
            // { test: /.json$/, use: 'file',         exclude: /(node_modules)/},
        ]
    }
};