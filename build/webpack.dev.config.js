const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = cwd => {
  return merge(require('./webpack.base.config')(cwd), {
    entry: ['./src/main.js', `${__dirname}/dev-client`],
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}
