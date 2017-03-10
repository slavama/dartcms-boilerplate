const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            //{test: /\.(js|jsx)$/, use: 'babel-loader'},
            //{test: /\.css$/, use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])},
            {
                test: /\.less$/, use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },

    plugins: [
        // Avoid publishing files when compilation failed:
        //new webpack.NoEmitOnErrorsPlugin(),

        // Write out CSS bundle to its own file:
        //extractCSS,
        //extractLESS,
        new ExtractTextPlugin('style.css')

        //new webpack.optimize.UglifyJsPlugin({
        //    output: { comments: false },
        //    exclude: [ /\.min\.js$/gi ]          // skip pre-minified libs
        //}),
    ],

    // Generate external sourcemaps for the JS & CSS bundles
    // devtool: 'source-map'
};
