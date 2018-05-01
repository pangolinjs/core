const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

module.exports = context => {
  const devClientPath = path.join(__dirname, '../utils/dev-client')

  return merge(require('./base')(context), {
    entry: ['./src/main.js', devClientPath],
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}
