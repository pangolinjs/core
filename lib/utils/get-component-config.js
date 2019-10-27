const fs = require('fs')

/**
 * Get component config
 * @param {string} filePath Config file path
 * @returns {Object} Component config
 */
module.exports = function (filePath) {
  const defaultConfig = {
    template: 'default.njk'
  }

  try {
    const file = fs.readFileSync(filePath)
    return Object.assign(defaultConfig, JSON.parse(file))
  } catch {
    return defaultConfig
  }
}
