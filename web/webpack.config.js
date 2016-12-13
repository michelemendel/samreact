var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExportFilesWebpackPlugin = require('export-files-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var config = {
    entry: './src/app.js',

    output: {
        path: 'target/frontend-dist/assets',
        filename: 'bundle.js',
        publicPath: './assets/'
    },

    devServer: {
        stats: 'errors-only',
    },

    resolve: {
        root: path.resolve('./src'),
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(scss|css)/,
                loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap', {publicPath: ''})
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
            },
            {
                test: /\.(svg|woff|eot|ttf)/,
                loader: 'file?name=[path][name]-[hash].[ext]'
            }
        ]
    },

    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },

    plugins: [
        new ExtractTextPlugin('bundle.css'),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: '../index.html', // relativt i forhold til output.path (target/frontend-dist/assets)
            inject: true // sett automatisk inn <link> og <script> elementer hvor nødvendig
        }),

        new ExportFilesWebpackPlugin('../index.html', {
            outputPath: 'target/frontend-dist/assets'
        })
    ],
};


module.exports = config;
