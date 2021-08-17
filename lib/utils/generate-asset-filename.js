const store = require('../store')

/**
 * Generate name for assets
 * @param {string} dir Asset sub-directory name
 * @returns {string} Asset filename
 */
module.exports = function generateAssetFilename (dir) {
  // The boolean true value for fileNameHash is deprecated and replaced by
  // the boolean/string values false|'imported'|'all'.
  const addHash = store.state.config.fileNameHash === true ||
    store.state.config.fileNameHash === 'imported' ||
    store.state.config.fileNameHash === 'all'

  const hashExt = addHash ? '.[hash:8]' : ''

  return `assets/${dir}/[name]${hashExt}[ext]`
}
