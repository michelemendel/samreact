const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log('dirname:', __dirname);

const config = {
    entry: {
        bundle: './src/app.js'
    },

    // https://webpack.js.org/configuration/devtool/
    devtool: 'eval-source-map',

    output: {
        filename: '[name].js',
        path: 'public'
        //publicPath: '' // If you use some path, like / or /assets, you have to use a web server or set public path in package.json.
    },

    devServer: {
        port: 9090,
        stats: 'minimal',
        colors: true,
        inline: true
    },

    resolve: {
        root: path.resolve('./src'),
    },

    module: {

        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'jshint-loader'

            }
        ],

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
                loader: ExtractTextPlugin.extract(
                    'css?sourceMap!sass?sourceMap',
                    {publicPath: ''}
                )
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

    plugins: [
        // Extract CSS from bundle into it's own file.
        new ExtractTextPlugin('bundle.css'),

        // Create an index.html file.
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: './index.html', // Relative to output.path (public)
            inject: true // Automatically insert <link> and <script> elements where necessary.
        }),
    ],
};


module.exports = config;
