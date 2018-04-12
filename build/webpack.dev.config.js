const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = context => {
  return merge(require('./webpack.base.config')(context), {
    entry: ['./src/main.js', `${__dirname}/dev-client`],
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}
