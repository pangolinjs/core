const fs = require('fs-extra')

/**
 * Try to read file sync
 * @param {string} filePath Path to file
 * @returns {string} File contents
 */
module.exports = function (filePath) {
  try {
    return fs.readFileSync(filePath).toString()
  } catch (error) {
    return undefined
  }
}
