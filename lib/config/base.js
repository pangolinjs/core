const ci = require('ci-info')
const Config = require('webpack-chain')
const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')

const generateAssetFilename = require('../utils/generate-asset-filename')
const generateOutputFilename = require('../utils/generate-output-filename.js')
const generateTranspileRegex = require('../utils/generate-transpile-regex')
const PangolinPlugin = require('../webpack/pangolin-plugin.js')
const store = require('../store')

const transpileRegex = generateTranspileRegex(store.state.config.transpileDependencies)

/**
 * Create base webpack config
 * @param {string} context Project directory
 * @param {Object} [options={}] Config options
 * @param {Boolean} [options.modern] Generate modern bundle
 * @param {Boolean} [options.report] Generate report
 * @returns {Object} webpack-chain object
 */
module.exports = (context, options = {}) => {
  const { PANGOLIN_ENV } = process.env
  const config = new Config()

  /* eslint-disable indent */

  config.context(context)

  config.entry('main')
    .add('./src/main.js')

  config.output
    .filename(generateOutputFilename({ type: 'js', modern: options.modern }))
    .publicPath(store.state.config.project.base)

  config.resolve
    .alias
      .set('@', path.join(context, 'src'))

  config.resolveLoader
    .modules
      .add('node_modules')
      .add(path.join(context, 'node_modules'))
      .add(path.join(context, 'node_modules/@pangolinjs/core/node_modules'))

  config.performance
    .assetFilter(assetFilename => {
      // File extensions that shouldn't generate a performance hint.
      const isExcludedFile = /\.(html|map)$/.test(assetFilename)

      // Pangolin.js files shouldn't generate a performance hint.
      const isPangolinFile = /^pangolin\/.+$/.test(assetFilename)

      return !isExcludedFile && !isPangolinFile
    })

  // JavaScript

  config.module
    .rule('js')
      .test(/\.js$/)
      .exclude
        .add(filepath => {
          if (transpileRegex && transpileRegex.test(filepath)) {
            return false
          }

          return /node_modules/.test(filepath)
        })
        .end()
      .use('babel-loader')
        .loader('babel-loader')

  // CSS

  config.module
    .rule('css')
      .test(/\.(css|scss)$/)
      .use('css-loader')
        .loader('css-loader')
        .options({
          importLoaders: 2,
          esModule: true,
          sourceMap: true
        })
        .end()
      .use('postcss-loader')
        .loader('postcss-loader')
        .end()
      .use('sass-loader')
        .loader('sass-loader')
        .options({
          implementation: require('sass')
        })

  // Static assets

  config.module
    .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .type('asset/resource')
      .set('generator', {
        filename: generateAssetFilename('img')
      })

  config.module
    .rule('video')
      .test(/\.(mp4|webm)(\?.*)?$/)
      .type('asset/resource')
      .set('generator', {
        filename: generateAssetFilename('video')
      })

  config.module
    .rule('audio')
      .test(/\.(ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .type('asset/resource')
      .set('generator', {
        filename: generateAssetFilename('audio')
      })

  config.module
    .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .type('asset/resource')
      .set('generator', {
        filename: generateAssetFilename('font')
      })

  // Plugins

  config
    .plugin('env')
    .use(webpack.EnvironmentPlugin, [
      'NODE_ENV',
      'PANGOLIN_ENV'
    ])

  const progressConfig = {
    color: '#ff721f',
    name: 'Pangolin.js',
    reporters: ci.isCI ? ['basic'] : ['fancy']
  }

  if (PANGOLIN_ENV.startsWith('build')) {
    progressConfig.name = options.modern ? 'Modern' : 'Legacy'
    progressConfig.reporters.push('stats')
  }

  config
    .plugin('progress')
    .use(WebpackBar, [progressConfig])

  /**
   * Additional config for non-modern build
   */
  if (!options.modern) {
    config.entry('main')
      .add('./src/main.scss')

    if (PANGOLIN_ENV !== 'build') {
      config.module
        .rule('pangolin')
          .test(/\.njk$/)
          .use('pangolin-loader')
            .loader(require.resolve('../webpack/pangolin-loader.js'))

      config
        .plugin('pangolin-plugin')
        .use(PangolinPlugin)
    }
  }

  /* eslint-enable indent */

  return config
}
