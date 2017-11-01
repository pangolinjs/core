const webpack = require('webpack')

const StylelintPlugin = require('stylelint-webpack-plugin')

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
    new StylelintPlugin({
      syntax: 'scss'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]

  return webpackConfig
}
