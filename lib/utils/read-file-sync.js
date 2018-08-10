const fs = require('fs-extra')

/**
 * Try to read file sync
 * @param {string} filePath Path to file
 * @returns {string} File contents
 */
module.exports = function (filePath) {
  if (!filePath) {
    throw new Error('Paramater ‘filePath’ is necessary.')
  }

  if (typeof filePath !== 'string') {
    throw new Error('Parameter ‘filePath’ must be a string.')
  }

  try {
    return fs.readFileSync(filePath).toString()
  } catch (error) {
    return undefined
  }
}
