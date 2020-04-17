const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const common = require('./webpack.common.js');
const outputDir = path.resolve('dist/client');

module.exports = merge.smart(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // mode: 'production',
  // devtool: 'nosources-source-map',
  devServer: {
    contentBase: './ ',
    // publicPath: 'dist/client',
    watchContentBase: true,
    hot: true,
    port: 4000,
    host: '0.0.0.0',
    writeToDisk: true,
    historyApiFallback: true,
    // historyApiFallback: {
    //   index: 'index.html', // path.resolve(outputDir, 'index.html'),
    //   // rewrites: [
    //   //   {
    //   //     from: /./,
    //   //     to: '/dist/client/index.html',
    //   //   }
    //   // ],
    // },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // outputStyle: 'expanded',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      hmr: true,
      reloadAll: true,
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
  ],
});
