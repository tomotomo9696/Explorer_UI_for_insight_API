const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const zopfli = require("@gfx/zopfli");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new VueLoaderPlugin(),
    new CompressionPlugin({
      test: /\.(js)$/,
      algorithm: (content, options, fn) => {
        zopfli.gzip(content, options, fn);
      },
    })
  ]
});
