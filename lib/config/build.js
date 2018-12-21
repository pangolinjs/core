const CopyPlugin = require('copy-webpack-plugin')
const CSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

/**
 * Add config specific to build environment
 * @param {string} context Project directory
 * @param {Object} options Config options
 * @param {Boolean} options.report Generate report
 * @returns {Object} webpack-chain object
 */
module.exports = (context, options) => {
  const config = require('./base')(context, options)

  /* eslint-disable indent */

  if (process.env.PANGOLIN_ENV === 'build') {
    config.output
      .path(path.join(context, 'dist'))
  }

  if (process.env.PANGOLIN_ENV === 'build:dev') {
    config.entry('main')
      .add('./.temp/html.js')

    config.output
      .path(path.join(context, 'dev'))
  }

  config
    .mode('production')
    .devtool('source-map')

  config.optimization
    .splitChunks({
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    })
    .runtimeChunk('single')

  // CSS

  config.module
    .rule('css')
      .use('css-extract-loader')
        .loader(CSSExtractPlugin.loader)
        .before('css-loader')
        .end()

  // Plugins

  config
    .plugin('friendly-errors')
    .tap(options => [{
      ...options,
      clearConsole: false
    }])

  config
    .plugin('css-extract')
    .use(CSSExtractPlugin, [{
      filename: 'css/[name].css'
    }])

  config
    .plugin('copy')
    .use(CopyPlugin, [[
      {
        from: 'src/public'
      },
      {
        from: path.join(__dirname, '../../ui/dist'),
        ignore: [process.env.PANGOLIN_ENV === 'build:dev' ? '' : '*']
      }
    ]])

  /* eslint-enable indent */

  return config
}
