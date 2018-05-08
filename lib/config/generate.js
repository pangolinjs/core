const getConfig = require('../utils/get-config')
const merge = require('webpack-merge')

/**
 * Merge project config and convert to webpack readable config object
 *
 * Set `process.env.NODE_ENV` and `process.env.PANGOLIN_ENV`
 * so environment based configuration will work correctly
 *
 * @param {string} context Project directory
 * @returns {Object} webpack config object
 */
module.exports = function (context) {
  let defaultConfig

  if (process.env.PANGOLIN_ENV === 'dev') {
    defaultConfig = require('./dev')(context)
  }

  if (process.env.PANGOLIN_ENV.startsWith('build')) {
    defaultConfig = require('./build')(context)
  }

  let projectConfig = getConfig(context, 'webpack.js')

  // Apply project chain settings
  if (typeof projectConfig.chain === 'function') {
    projectConfig.chain(defaultConfig)
  }

  // Convert webpack-chain into webpack config object
  let webpackConfig = defaultConfig.toConfig()

  // Mutate webpack config in case project config is a function
  if (typeof projectConfig.configure === 'function') {
    projectConfig.configure(webpackConfig)
  }

  // Merge project config in case it's an object
  if (typeof projectConfig.configure === 'object') {
    webpackConfig = merge(webpackConfig, projectConfig.configure)
  }

  return webpackConfig
}
