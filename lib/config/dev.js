const chalk = require('chalk')
const FriendlyErrorsPlugin = require('@nuxtjs/friendly-errors-webpack-plugin')
const path = require('path')
const StylelintPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')

/**
 * Add config specific to dev environment
 * @param {string} context Project directory
 * @param {Object} [options={}] Config options
 * @param {String} options.localURL Local development server URL
 * @param {String} options.lanURL LAN development server URL
 * @returns {Object} webpack-chain object
 */
module.exports = (context, options = {}) => {
  const config = require('./base')(context, options)

  /* eslint-disable indent */

  config.entry('main')
    .add('./.temp/html.js')

  config
    .mode('development')
    .devtool('eval-cheap-module-source-map')

  config.devServer
    .clientLogLevel('silent')
    .stats('errors-only')
    .noInfo(true)
    .hot(true)
    .contentBase([
      path.join(__dirname, '../../ui/dist'),
      path.join(context, 'src/public')
    ])
    .watchContentBase(true)

  // JavaScript

  config.module
    .rule('js')
      .use('eslint-loader')
        .loader('eslint-loader')
        .options({
          emitWarning: true,
          formatter: require('eslint/lib/cli-engine/formatters/codeframe')
        })

  // CSS

  config.module
    .rule('css')
      .use('style-loader')
        .loader('style-loader')
        .before('css-loader')

  // Plugins

  config
    .plugin('stylelint')
    .use(StylelintPlugin, [{
      emitWarning: true,
      formatter: require('stylelint-codeframe-formatter'),
      syntax: 'scss'
    }])

  config
    .plugin('hmr')
    .use(webpack.HotModuleReplacementPlugin)

  config
    .plugin('friendly-errors')
    .use(FriendlyErrorsPlugin, [{
      reporter: 'consola',
      compilationSuccessInfo: {
        messages: [
          chalk`Pangolin.js dev server running at {blue ${options.localURL}}.`
        ],
        notes: [
          'Note that the development build is not optimized.',
          chalk`To create a production build, run {green npm run build}.`
        ]
      }
    }])

  /* eslint-enable indent */

  return config
}
