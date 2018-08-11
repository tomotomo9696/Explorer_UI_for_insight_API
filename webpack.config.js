const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const zopfli = require('node-zopfli');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },
  devServer: {
    contentBase: 'dist',
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
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
    extensions: ['.js', '.vue'],
    modules: [
      "node_modules"
    ],
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 2
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                require('autoprefixer'),
                require('cssnano'),
              ]
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      }
    ]
  },
  //devtool: "source-map"
}
