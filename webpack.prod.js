const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer(),
                cssnano({
                  discardComments: {
                    removeAll: true,
                  },
                }),
              ],
            },
          },
        ],
      },
    ],
  },
});
