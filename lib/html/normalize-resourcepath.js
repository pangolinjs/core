/**
 * Convert Windows path to Unix path
 * @param {string} file webpack resourcePath
 */
module.exports = function (file) {
  return file.replace(/\\/g, '/')
}
