const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const vendorCSS = new ExtractTextPlugin('css/vendors.css');
const mainCSS = new ExtractTextPlugin('css/main.css');

function isExternal(module) {
    const userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('bower_components') >= 0 ||
        userRequest.indexOf('node_modules') >= 0 ||
        userRequest.indexOf('lib') >= 0;
}

module.exports = {
    devtool: 'source-map',
    entry: {
        main: "./js/index.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    presets: ['es2015'],
                    sourceMap: true
                }
            },
            {
                test: /\.css$/,
                use: vendorCSS.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: {discardComments: {removeAll: true}}
                        }
                    }
                }),
            },
            {
                test: /\.less$/,
                use: mainCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: {discardComments: {removeAll: true}},
                                sourceMap: true
                            }
                        },
                        'less-loader'
                    ],
                })
            },
            {
                test: /\.(woff2?|ttf|eot|svg|gif|png|jpg|jpeg)$/,
                use: 'file-loader?name=[name].[ext]&publicPath=../media/&outputPath=media/'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: function (module) {
                return isExternal(module);
            }
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        vendorCSS,
        mainCSS,
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false},
            sourceMap: true
        })
    ]
};
