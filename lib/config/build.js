const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyPlugin = require('copy-webpack-plugin')
const CSSExtractPlugin = require('mini-css-extract-plugin')
const cssnano = require('cssnano')
const ManifestPlugin = require('webpack-manifest-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const generateOutputFilename = require('../utils/generate-output-filename.js')
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
  const { PANGOLIN_ENV } = process.env
  const config = require('./base')(context, options)

  /* eslint-disable indent */

  if (PANGOLIN_ENV === 'build') {
    config.output
      .path(path.join(context, 'dist'))
  }

  if (PANGOLIN_ENV === 'build:dev') {
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

  config.optimization
    .minimizer('terser')
    .use(TerserPlugin, [{
      exclude: /^pangolin[\\/]/,
      extractComments: false
    }])

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
    if (PANGOLIN_ENV === 'build:dev') {
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
          .end()
        .use('cssnano-loader')
          .loader('postcss-loader')
          .after('css-loader')
          .options({
            sourceMap: true,
            plugins: [cssnano({
              preset: ['default', {
                mergeLonghand: false,
                mergeRules: false
              }]
            })]
          })

    // Plugins

    config
      .plugin('css-extract')
      .use(CSSExtractPlugin, [{
        filename: generateOutputFilename({ type: 'css' })
      }])

    const copyPatterns = [
      { from: 'src/public' }
    ]

    if (PANGOLIN_ENV === 'build:dev') {
      copyPatterns.push({ from: path.join(__dirname, '../../ui/dist') })
    }

    config
      .plugin('copy')
      .use(CopyPlugin, [{ patterns: copyPatterns }])
    }

  /* eslint-enable indent */

  return config
}
