const path = require('path')
const webpack = require('webpack')

const CopyPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const StylelintPlugin = require('stylelint-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = cwd => {
  const webpackConfig = require('./webpack.base.config')(cwd)

  webpackConfig.plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`,
        FESG_ENV: `"${process.env.FESG_ENV}"`
      }
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new StylelintPlugin({
      syntax: 'scss'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(cwd, 'node_modules')) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new CopyPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      },
      {
        context: __dirname,
        from: '../dist',
        to: 'fesg',
        ignore: [process.env.NODE_ENV === 'production' ? '*' : '']
      }
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      jpegtran: {
        progressive: true
      }
    }),
    new FriendlyErrorsPlugin({
      clearConsole: false
    })
  ]

  return webpackConfig
}
