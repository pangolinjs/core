/**
 * Convert Windows path to Unix path
 * @param {string} path Path to convert
 * @returns {string} Converted path
 */
module.exports = function (path) {
  if (!path) {
    throw new Error('Paramater ‘path’ is necessary.')
  }

  if (typeof path !== 'string') {
    throw new Error('Parameter ‘path’ must be a string.')
  }

  return path.replace(/\\/g, '/')
}
