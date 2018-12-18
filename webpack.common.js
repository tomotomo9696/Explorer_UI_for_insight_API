const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/build"),
    publicPath: "/build/"
  },
  resolve: {
    extensions: [".js", ".vue"],
    modules: [
      "node_modules"
    ],
    alias: {
      vue: "vue/dist/vue.esm.js"
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer"),
                require("cssnano"),
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              data: `@import "variable.scss";`,
              includePaths: [path.resolve(__dirname, "src/scss/")]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer"),
                require("cssnano"),
              ]
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      }
    ]
  }
}

