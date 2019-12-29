const ci = require('ci-info')
const Config = require('webpack-chain')
const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')

const generateFileLoaderOptions = require('../utils/generate-file-loader-options')
const PangolinPlugin = require('../webpack/pangolin-plugin.js')
const store = require('../store')

/**
 * Create base webpack config
 * @param {string} context Project directory
 * @param {Object} [options={}] Config options
 * @param {Boolean} [options.modern] Generate modern bundle
 * @param {Boolean} [options.report] Generate report
 * @returns {Object} webpack-chain object
 */
module.exports = (context, options = {}) => {
  const config = new Config()

  /* eslint-disable indent */

  config.context(context)

  config.entry('main')
    .add('./src/main.js')

  config.output
    .filename(`js/[name]${options.modern ? '.modern' : ''}.js`)
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
        .add(/node_modules/)
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
        .options({
          sourceMap: true
        })
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
      .use('file-loader')
        .loader('file-loader')
        .options(generateFileLoaderOptions('img'))

  config.module
    .rule('video')
      .test(/\.(mp4|webm)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options(generateFileLoaderOptions('video'))

  config.module
    .rule('audio')
      .test(/\.(ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options(generateFileLoaderOptions('audio'))

  config.module
    .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('file-loader')
        .loader('file-loader')
        .options(generateFileLoaderOptions('fonts'))

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

  if (process.env.PANGOLIN_ENV.startsWith('build')) {
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

    if (process.env.PANGOLIN_ENV !== 'build') {
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
