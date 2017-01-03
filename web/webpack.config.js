const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProduction = process.argv.indexOf('-p') > -1;

console.log('dirname:', __dirname);

const config = {
    entry: ['./src/app.js'],

    // https://webpack.js.org/configuration/devtool/
    devtool: isProduction ? 'source-map' : 'eval-source-map',

    output: {
        filename: 'bundle.js',
        path: 'target',
        publicPath: '' // If you use some path, like / or /assets, you have to use a web server or set public path in package.json.
    },

    devServer: {
        port: 9090,
        stats: 'minimal',
        colors: true,
        inline: true
    },

    eslint: {
        configFile: './.eslintrc'
    },

    resolve: {
        root: path.resolve('./src'),
    },

    module: {

        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
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

    plugins: [
        // Extracts CSS from bundle into it's own file.
        new ExtractTextPlugin('bundle.css'),

        // Creates an index.html file.
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: './index.html', // Relative to output.path (target)
            inject: true // Automatically insert <link> and <script> elements where necessary.
        }),


        // https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a
        new webpack.DefinePlugin({ // Key to reducing React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(), // Dedupe similar code
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}), // Minify everything
        new webpack.optimize.AggressiveMergingPlugin() // Merge chunks
    ],
};


module.exports = config;
