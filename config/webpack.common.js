const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const path = require("path")
const webpack = require('webpack')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].[contenthash].js",
        publicPath: "/",
        assetModuleFilename: "images/[hash][ext][query]"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'ts-loader' }
                ]
            },
            {
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "react-app",
                            "babel-preset-mobx"
                        ],
                        plugins: [
                            [
                                "@babel/plugin-proposal-decorators",
                                {
                                    "legacy": true
                                }
                            ],
                            [
                                "@babel/plugin-proposal-class-properties",
                                {
                                    "loose": false
                                }
                            ],
                            [
                                "@babel/plugin-proposal-private-methods",
                                {
                                    "loose": false
                                }
                            ],
                            [
                                "@babel/plugin-proposal-private-property-in-object",
                                {
                                    "loose": false
                                }
                            ]
                        ]
                    }
                },
                test: /.(js|jsx)$/,
                exclude: /node_modules/
            },
            {
                type: "asset/resource",
                test: /\.(png|svg|jpg|jpeg|gif)$/i
            },
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                use: {
                    loader: "url-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    plugins: [
        // new ForkTsCheckerWebpackPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico"
        })
    ]
}
