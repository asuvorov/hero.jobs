const path = require("path");
const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");


/*****************************************************************************/
const cleanPlugin = new CleanWebpackPlugin(["public"])
const extractPlugin = new ExtractTextPlugin({
    filename:   "./style.css"
})
const htmlPlugin = new HtmlWebPackPlugin({
    template:   "./client/src/index.html",
    inject:     true
});


/*****************************************************************************/
module.exports = {
    entry:  "./client/src/index.js",
    output: {
        filename:   "[name].bundle.js",
        path:       path.join(__dirname, "dist"),
        publicPath: "/",
    },
    module: {
        rules: [{
            test:       /\.(jsx|js)$/,
            exclude:    /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test:   /\.html$/,
            use:    "html-loader",
        }, {
            test:   /\.(scss|css)$/,
            use:    extractPlugin.extract({
                use: [
                    "css-loader",
                    "sass-loader",
                    "postcss-loader",
                ],
                fallback:   "style-loader"
            })
        }, {
            test:   /\.(jpg|png|gif|svg)$/,
            use: [{
                loader:     "file-loader",
                options: {
                    name:       "[name].[ext]",
                    outputPath: "./assets/",
                }
            }]
        }, {
            type:       "javascript/auto",
            test:       /\.json$/,
            use: {
                loader: "json-loader",
            }
        }]
    },
    plugins: [
        cleanPlugin,
        htmlPlugin,
        extractPlugin,
    ],
    optimization: {},
    devServer: {
        contentBase:    path.resolve(__dirname, "dist/assets"),
        stats:          "errors-only",
        open:           true,
        port:           8080,
        compress:       true,
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json", ".jpg"],
    },
    node: {
        fs:         "empty",
    },
};
