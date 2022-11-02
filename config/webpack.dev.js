const { HotModuleReplacementPlugin } = require("webpack")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const { default: merge } = require("webpack-merge")
const common = require("./webpack.common")
const webpack = require('webpack')

const devConfig = {
    mode: "development",
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /.(css|sass|scss)$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    }
}

module.exports = merge(common, devConfig)
