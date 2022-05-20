const { HotModuleReplacementPlugin } = require("webpack")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const { default: merge } = require("webpack-merge")
const common = require("./webpack.common")
const webpack = require('webpack')

const devConfig = {
    mode: "development",
    devServer: {
        port: 3000,
        hot: true,
        historyApiFallback: {
            disableDotRule: true,
        }
    },
    target: "web",
    plugins: [
        new HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('development'),
        })
    ],
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
