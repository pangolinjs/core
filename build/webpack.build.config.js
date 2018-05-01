const CopyPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const merge = require('webpack-merge')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = context => {
  return merge(require('./webpack.base.config')(context), {
    devtool: 'source-map',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(path.join(context, 'node_modules')) === 0
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
          to: 'pangolin',
          ignore: [process.env.PANGOLIN_ENV === 'build:dev' ? '' : '*']
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
  })
}
