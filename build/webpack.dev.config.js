const webpack = require('webpack')

module.exports = cwd => {
  const webpackConfig = require('./webpack.base.config')(cwd)

  webpackConfig.plugins.push(...[
    new webpack.HotModuleReplacementPlugin()
  ])

  return webpackConfig
}
