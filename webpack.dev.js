const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const history = require("connect-history-api-fallback");
const convert = require("koa-connect");

const path = require('path');

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css",
    })  
  ],
  devServer: {
    contentBase: "dist",
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true
  }
});
