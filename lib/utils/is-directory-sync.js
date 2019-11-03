const fs = require('fs')

/**
 * Determine if a path is a directory
 * @param {String} path Directory path
 * @returns {Boolean} Path is a directory
 */
module.exports = function (path) {
  return fs.statSync(path).isDirectory()
}
