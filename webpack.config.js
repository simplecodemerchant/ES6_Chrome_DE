const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    target: 'web',
    devtool: 'inline-source-map',
    entry: {
        'index': path.resolve(__dirname, 'src/index.js'),
        'background': path.resolve(__dirname, 'src/background/background.js'),
        'options': path.resolve(__dirname, 'src/background/options.js'),
        'popup': path.resolve(__dirname, 'src/background/popup.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            { test: /\.js$/,   use: 'babel-loader', exclude: /(node_modules)/},
            { test: /\.scss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]},
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
    ]
};