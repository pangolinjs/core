const path = require('path')
const readFileSync = require('./read-file-sync')

/**
 * Get project configuration
 * @param {string} context Project directory
 * @returns {Object} Configuration
 */
module.exports = (context) => {
  return readFileSync(path.join(context, 'pangolin.config.js')) || {}
}
