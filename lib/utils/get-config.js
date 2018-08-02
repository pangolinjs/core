const path = require('path')

/**
 * Get project configuration
 * @param {string} context Project directory
 * @returns {Object} Configuration
 */
module.exports = (context) => {
  return require(path.join(context, 'pangolin.config.js'))
}
