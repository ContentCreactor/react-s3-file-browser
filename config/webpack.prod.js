const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { default: merge } = require("webpack-merge")
const common = require("./webpack.common")
const webpack = require('webpack')

const prodConfig = {
  mode: "production",
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./dist/styles/[name].css"
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
  }),
  ],
  module: {
    rules: [
      {
        test: /.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ]
      }
    ]
  }
}

module.exports = merge(common, prodConfig)