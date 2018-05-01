const getConfig = require('../utils/get-config')

/**
 * Get project webpack config
 * @param {string} context Project directory
 * @return {Object} Configuration object
 */
module.exports = context => {
  const config = getConfig(context, 'webpack.js')

  if (!config || !config.configure) {
    return {}
  }

  if (typeof config.configure === 'function') {
    return config.configure(context)
  }

  if (typeof config.configure === 'object') {
    return config.configure
  }

  return {}
}
