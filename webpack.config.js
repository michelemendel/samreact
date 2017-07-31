const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log('DIRNAME', __dirname);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // https://webpack.js.org/configuration/devtool/
    devtool: "inline-source-map",
    module: {
        rules: [{
            // https://www.codementor.io/goodnesstoluwanimikayode134/setting-up-react-with-webpack-3-0-yarn-and-babel-9ftd5phqz
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['env']
            }
        },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }],
                    // Use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.(svg|woff|eot|ttf)$/,
                use: 'file-loader'
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin() // Enable HMR
    ],
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        port: 9090,
        compress: false,
        hot: true
    }
};