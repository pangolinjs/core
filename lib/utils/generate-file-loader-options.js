const store = require('../store')

/**
 * Generate options for file-loader
 * @param {string} dir Asset sub-directory name
 * @returns {{name:string, publicPath:string}} file-loader options
 */
function generateFileLoaderOptions (dir) {
  // The boolean true value for fileNameHash is deprecated and replaced by
  // the boolean/string values false|'imported'|'all'.
  const addHash = store.state.config.fileNameHash === true ||
    store.state.config.fileNameHash === 'imported' ||
    store.state.config.fileNameHash === 'all'

  const hashExt = addHash ? '.[hash:8]' : ''

  const options = {
    name: `assets/${dir}/[name]${hashExt}.[ext]`
  }

  if (process.env.NODE_ENV === 'production') {
    options.publicPath = store.state.config.project.base
  }

  return options
}

module.exports = generateFileLoaderOptions
