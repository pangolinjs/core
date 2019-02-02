const store = require('../store')
const merge = require('webpack-merge')

/**
 * Merge project config and convert to webpack readable config object
 *
 * Set `process.env.NODE_ENV` and `process.env.PANGOLIN_ENV`
 * so environment based configuration will work correctly
 *
 * @param {string} context Project directory
 * @param {Object} options Config options
 * @returns {Object} webpack config object
 */
module.exports = function (context, options) {
  let defaultConfig

  if (process.env.PANGOLIN_ENV === 'dev') {
    defaultConfig = require('./dev')(context, options)
  }

  if (process.env.PANGOLIN_ENV.startsWith('build')) {
    defaultConfig = require('./build')(context, options)
  }

  // Apply project chain settings
  if (typeof store.state.config.chain === 'function') {
    store.state.config.chain(defaultConfig)
  }

  // Convert webpack-chain into webpack config object
  let webpackConfig = defaultConfig.toConfig()

  // Mutate webpack config in case project config is a function
  if (typeof store.state.config.configure === 'function') {
    store.state.config.configure(webpackConfig)
  }

  // Merge project config in case it's an object
  if (typeof store.state.config.configure === 'object') {
    webpackConfig = merge(webpackConfig, store.state.config.configure)
  }

  return webpackConfig
}