const store = require('../store')

/**
 * Generate options for file-loader
 * @param {string} dir Asset sub-directory name
 * @returns {{name:string, publicPath:string}} file-loader options
 */
function generateFileLoaderOptions (dir) {
  const fileNameHash = store.state.config.fileNameHash ? '.[hash:8]' : ''

  const options = {
    name: `assets/${dir}/[name]${fileNameHash}.[ext]`,
    esModules: true
  }

  if (process.env.NODE_ENV === 'production') {
    options.publicPath = store.state.config.project.base
  }

  return options
}

module.exports = generateFileLoaderOptions
