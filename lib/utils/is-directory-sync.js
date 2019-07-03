const fs = require('fs-extra')

/**
 * Determine if a path is a directory
 * @param {String} path Directory path
 * @returns {Boolean} Path is a directory
 */
module.exports = function (path) {
  return fs.lstatSync(path).isDirectory()
}
