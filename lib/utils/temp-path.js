const path = require('path')

/**
 * Get temp path
 * @param {string} context Project directory
 * @param {string} [file] Optional temp file
 * @returns {string} Path to temp folder or file
 */
module.exports = function (context, file) {
  if (file) {
    return path.join(context, '.temp', file)
  }

  return path.join(context, '.temp')
}
