const path = require('path')

/**
 * Get page type from file path
 * @param {string} file Absolute file path
 * @returns {'components'|'prototypes'} Page type
 */
module.exports = function (file) {
  if (path.dirname(file).endsWith('prototypes')) {
    return 'prototypes'
  } else {
    return 'components'
  }
}
