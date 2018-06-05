const path = require('path')

/**
 * Get project config file
 * @param {string} context Project directory
 * @param {string} name Config file name
 * @return Default export of config file
 */
module.exports = (context, name) => {
  try {
    const config = require(path.join(context, 'config', name))
    return config
  } catch (error) {
    return {}
  }
}
