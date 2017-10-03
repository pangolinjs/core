const path = require('path')
const webpack = require('webpack')

const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = (cwd) => {
  return {
    context: cwd,
    entry: ['./src/main.js', `${__dirname}/dev-client`],
    output: {
      path: `${cwd}/dev`,
      filename: 'js/[name].js',
      publicPath: '/'
    },
    resolve: {
      alias: {
        'fesg': path.join(__dirname, '../docs')
      }
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(css|scss)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                precision: 10,
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${process.env.NODE_ENV}"`,
          FESG_ENV: `"${process.env.FESG_ENV}"`
        }
      }),
      new StylelintPlugin({
        syntax: 'scss'
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}
