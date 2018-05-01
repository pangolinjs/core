const cssLoaders = require('./css-loaders')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const StylelintPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')

module.exports = context => {
  const outputPaths = {
    'dev': `${context}/dev`,
    'build': `${context}/dist`,
    'build:dev': `${context}/dev`,
    'build:proto': `${context}/proto`
  }

  return {
    context: context,
    entry: './src/main.js',
    output: {
      path: outputPaths[process.env.PANGOLIN_ENV],
      filename: 'js/[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(context, 'src'),
            path.resolve(context, 'test')
          ],
          loader: 'eslint-loader',
          enforce: 'pre',
          options: {
            emitWarning: process.env.PANGOLIN_ENV === 'dev'
          }
        },
        {
          test: /\.js$/,
          include: [
            path.resolve(context, 'src')
          ],
          loader: 'babel-loader'
        },
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: {
              loader: 'style-loader',
              options: {
                sourceMap: true
              }
            },
            use: cssLoaders
          })
        }
      ]
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${process.env.NODE_ENV}"`,
          PANGOLIN_ENV: `"${process.env.PANGOLIN_ENV}"`
        }
      }),
      new StylelintPlugin({
        emitErrors: process.env.PANGOLIN_ENV.startsWith('build'),
        syntax: 'scss'
      }),
      new ExtractTextPlugin({
        disable: process.env.PANGOLIN_ENV === 'dev',
        filename: 'css/[name].css'
      })
    ]
  }
}
