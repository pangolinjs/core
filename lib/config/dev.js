const generateImports = require('../html/generate-imports')

/**
 * Add config specific to dev environment
 * @param {string} context Project directory
 * @returns {Object} webpack-chain object
 */
module.exports = context => {
  const config = require('./base')(context)

  /* eslint-disable indent */

  config.entry('main')
    .add(generateImports.components(context))
    .add(generateImports.prototypes(context))

  config
    .mode('development')
    .devtool('cheap-module-eval-source-map')

  config.module
    .rule('js')
      .use('eslint-loader')
        .tap(options => ({
          ...options,
          emitWarning: true
        }))

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
    .tap(options => [{
      ...options,
      emitErrors: false
    }])

  /* eslint-enable indent */

  return config
}
