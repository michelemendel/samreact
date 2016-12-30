const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExportFilesWebpackPlugin = require('export-files-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log('dirname:', __dirname);
console.log('src:', path.resolve('./src'));
console.log('assets:', path.resolve('/assets'));
console.log('icons:', path.resolve('./src/style/icons'));


const config = {
    entry: './src/app.js',

    // https://webpack.js.org/configuration/devtool/
    devtool: 'eval-source-map',

    output: {
        filename: 'bundle.js',
        path: 'target',
        publicPath: '' // If you use some path, like / or /assets, you have to use a web server.
    },

    devServer: {
        port: 9090,
        stats: 'errors-only',
        colors: true,
        inline: true
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
                test: /\.(svg|woff|eot|ttf)$/,
                loader: 'file-loader'
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
            filename: './index.html', // Relative to output.path (target)
            inject: true // Automatically insert <link> and <script> elements where necessary.
        }),

        new ExportFilesWebpackPlugin('./index.html', {
            outputPath: 'target'
        })
    ],
};


module.exports = config;
