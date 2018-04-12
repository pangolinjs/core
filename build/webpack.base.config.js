const cssLoaders = require('./css-loaders')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const StylelintPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')

module.exports = cwd => {
  const config = require('./config')(cwd)[process.env.FESG_ENV]

  return {
    context: cwd,
    entry: config.entry,
    output: {
      path: config.path,
      filename: 'js/[name].js',
      publicPath: '/'
    },
    devtool: config.devtool,
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(cwd, 'src'),
            path.resolve(cwd, 'test')
          ],
          loader: 'eslint-loader',
          enforce: 'pre',
          options: {
            emitWarning: process.env.FESG_ENV === 'dev'
          }
        },
        {
          test: /\.js$/,
          include: [
            path.resolve(cwd, 'src')
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
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${process.env.NODE_ENV}"`,
          FESG_ENV: `"${process.env.FESG_ENV}"`
        }
      }),
      new StylelintPlugin({
        emitErrors: process.env.FESG_ENV.startsWith('build'),
        syntax: 'scss'
      }),
      new ExtractTextPlugin({
        disable: process.env.FESG_ENV === 'dev',
        filename: 'css/[name].css'
      })
    ]
  }
}
