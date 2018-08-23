const store = require('../store')

/**
 * Generate options for file-loader
 * @param {string} dir Asset sub-directory name
 * @returns {{name:string, publicPath:string}} file-loader options
 */
function generateFileLoaderOptions (dir) {
  const name = `assets/${dir}/[name]${store.config.fileNameHash ? '.[hash:8]' : ''}.[ext]`
  const publicPath = process.env.NODE_ENV === 'production' && '..'

  return { name, publicPath }
}

module.exports = generateFileLoaderOptions
