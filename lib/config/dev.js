const FriendlyErrorsPlugin = require('@nuxtjs/friendly-errors-webpack-plugin')
const path = require('path')
const StylelintPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')

/**
 * Add config specific to dev environment
 * @param {string} context Project directory
 * @param {Object} [options={}] Config options
 * @param {String} [options.serverURL] Development server URL
 * @returns {Object} webpack-chain object
 */
module.exports = (context, options = {}) => {
  const config = require('./base')(context, options)

  /* eslint-disable indent */

  config.entry('main')
    .add('./.temp/html.js')

  config
    .mode('development')
    .devtool('cheap-module-eval-source-map')

  config.devServer
    .clientLogLevel('none')
    .quiet(true)
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
          formatter: require('eslint/lib/formatters/codeframe')
        })

  // CSS

  config.module
    .rule('css')
      .use('style-loader')
        .loader('style-loader')
        .before('css-loader')
        .options({
          sourceMap: true
        })

  // Plugins

  config
    .plugin('stylelint')
    .use(StylelintPlugin, [{
      emitErrors: false,
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
        messages: [`Pangolin dev server running at ${options.serverURL}`]
      }
    }])

  /* eslint-enable indent */

  return config
}
