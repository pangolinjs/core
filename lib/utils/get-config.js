const path = require('path')

/**
 * Get project config file
 * @param {string} context Project directory
 * @returns {Object} Default export of config file
 */
module.exports = (context) => {
  try {
    return require(path.join(context, 'pangolin.config.js'))
  } catch (error) {
    return {}
  }
}
