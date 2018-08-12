const CopyPlugin = require('copy-webpack-plugin')
const CSSExtractPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const path = require('path')

/**
 * Add config specific to build environment
 * @param {string} context Project directory
 * @returns {Object} webpack-chain object
 */
module.exports = context => {
  const config = require('./base')(context)

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
        from: 'src/public',
        to: '.'
      },
      {
        from: path.join(__dirname, '../../ui/dist'),
        to: 'pangolin',
        ignore: [process.env.PANGOLIN_ENV === 'build:dev' ? '' : '*']
      }
    ]])

  config
    .plugin('imagemin')
    .use(ImageminPlugin, [{
      test: /\.(jpe?g|png|gif|svg)$/i
    }])

  /* eslint-enable indent */

  return config
}
