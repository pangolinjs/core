const store = require('../store.js')

/**
 * Generate output filename with hash and things
 * @param {Object} options Options
 * @param {'js'|'css'} options.type File type
 * @param {boolean} options.modern Is modern build
 * @returns {string} File name schema
 */
function generateOutputFilename ({ type, modern }) {
  const hashExt = store.state.config.fileNameHash === 'all' ? '.[hash:8]' : ''
  const modernExt = modern ? '.modern' : ''

  return `${type}/[name]${modernExt}${hashExt}.${type}`
}

module.exports = generateOutputFilename
