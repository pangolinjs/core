const path = require('path')

/**
 * Create formatted path with forward slashes
 * @param {string} segments Path segments
 * @returns {string} Formatted path
 */
module.exports = function (...segments) {
  return path.join(...segments)
    .split(path.sep)
    .join('/')
}
