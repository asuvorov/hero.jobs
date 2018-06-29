const webpack = require("webpack");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


/*****************************************************************************/
module.exports = require("./webpack.config.js");

delete module.exports.devtool;


/*****************************************************************************/
module.exports.module.rules.forEach(rule => {
    delete rule.exclude;

    return rule;
});

module.exports.plugins.push(
    new webpack.DefinePlugin({
        "process.env.NODE_ENV":     JSON.stringify("production")
    })
);

module.exports.optimization.runtimeChunk = "single",
module.exports.optimization.minimizer = [
    new UglifyJsPlugin({
        cache:      true,
        parallel:   true,
        uglifyOptions: {
            compress:   {},
            ecma:       6,
            mangle:     true,
            comments:   false,
            minimize:   true,
        },
        sourceMap:  true
    })
]
