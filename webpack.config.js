const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const zopfli = require("@gfx/zopfli");

const history = require("connect-history-api-fallback");
const convert = require("koa-connect");

const path = require('path');

module.exports = {
  mode: process.env.WEBPACK_SERVE ? "development" : "production",

  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
    path: `${__dirname}/dist`,
    publicPath: "/"
  },
  plugins: [
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
  ],
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
        loader: "vue-loader",
      },
      {
        test   : /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: () => [
                require("autoprefixer"),
                require("cssnano"),
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: () => [
                require("autoprefixer"),
                require("cssnano"),
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
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
  },
  serve: {
    content: path.resolve(__dirname, "dist"),
    port: 8081,
    host: "0.0.0.0",
    hotClient: {
      host: {
        server: "0.0.0.0",
        client: "*"
      }
    },
    add: (app, middleware, options) => {
      app.use(convert(history({ index: "/" })));
    }
  }
  //devtool: "source-map"
}

