const StylelintPlugin = require('stylelint-webpack-plugin')
const tempPath = require('../utils/temp-path')

/**
 * Add config specific to dev environment
 * @param {string} context Project directory
 * @returns {Object} webpack-chain object
 */
module.exports = context => {
  const config = require('./base')(context)

  /* eslint-disable indent */

  config.entry('main')
    .add(tempPath(context, 'html.js'))

  config
    .mode('development')
    .devtool('cheap-module-eval-source-map')

  config.module
    .rule('js')
      .use('eslint-loader')
        .loader('eslint-loader')
        .options({
          emitWarning: true,
          formatter: require('eslint/lib/formatters/codeframe')
        })

  config.module
    .rule('css')
      .use('style-loader')
        .loader('style-loader')
        .before('css-loader')
        .options({
          sourceMap: true
        })

  config
    .plugin('stylelint')
    .use(StylelintPlugin, [{
      emitErrors: false,
      formatter: require('stylelint-codeframe-formatter'),
      syntax: 'scss'
    }])

  /* eslint-enable indent */

  return config
}
