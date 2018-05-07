const path = require('path')

/**
 * Get project config file
 * @param {string} context Project directory
 * @param {string} name Config file name
 * @return {Object} Default export of config file
 */
module.exports = (context, name) => {
  try {
    return require(path.join(context, 'config', name))
  } catch (error) {
    return {}
  }
}
