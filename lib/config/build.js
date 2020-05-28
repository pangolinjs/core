const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyPlugin = require('copy-webpack-plugin')
const CSSExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const path = require('path')
const store = require('../store.js')

/**
 * Add config specific to build environment
 * @param {string} context Project directory
 * @param {Object} [options={}] Config options
 * @param {Boolean} [options.modern] Build additional modern bundle
 * @param {Boolean} [options.report] Generate report
 * @returns {Object} webpack-chain object
 */
module.exports = (context, options = {}) => {
  const config = require('./base')(context, options)

  /* eslint-disable indent */

  if (process.env.PANGOLIN_ENV === 'build') {
    config.output
      .path(path.join(context, 'dist'))
  }

  if (process.env.PANGOLIN_ENV === 'build:dev') {
    config.output
      .path(path.join(context, 'dev'))
  }

  config
    .mode('production')
    .devtool('source-map')

  config.optimization
    .splitChunks({
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          name: 'vendors',
          chunks: 'all'
        }
      }
    })

  if (store.state.config.manifest) {
    config
      .plugin('manifest')
      .use(ManifestPlugin, [{
        fileName: `manifest${options.modern ? '.modern' : ''}.json`
      }])
  }

  if (options.report) {
    config
      .plugin('report')
      .use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static',
        reportFilename: `report${options.modern ? '.modern' : ''}.html`,
        openAnalyzer: false
      }])
  }

  /**
   * Additional config for non-modern build
   */
  if (!options.modern) {
    if (process.env.PANGOLIN_ENV === 'build:dev') {
      config.entry('main')
        .add('./.temp/html.js')
    }

    // CSS

    config.module
      .rule('css')
        .use('css-extract-loader')
          .loader(CSSExtractPlugin.loader)
          .before('css-loader')
          .options({
            esModule: true
          })

    // Plugins

    config
      .plugin('css-extract')
      .use(CSSExtractPlugin, [{
        filename: 'css/[name].css'
      }])

    const copyPatterns = [
      { from: 'src/public' }
    ]

    if (process.env.PANGOLIN_ENV === 'build:dev') {
      copyPatterns.push({ from: path.join(__dirname, '../../ui/dist') })
    }

    config
      .plugin('copy')
      .use(CopyPlugin, [{ patterns: copyPatterns }])
    }

  /* eslint-enable indent */

  return config
}
