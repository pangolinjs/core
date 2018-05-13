/**
 * Convert Windows path to Unix path
 * @param {string} path Path to convert
 * @returns {string} Converted path
 */
module.exports = function (path) {
  return path.replace(/\\/g, '/')
}
