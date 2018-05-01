const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

module.exports = context => {
  return merge(require('./base')(context), {
    entry: [path.join(__dirname, '../utils/dev-client')],
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}
