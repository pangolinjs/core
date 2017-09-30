const glob = require('glob')
const path = require('path')

/**
 * Get a list of components
 * @param {string} cwd Current working directory
 * @return {string[]}
 */
function components (cwd) {
  let files = glob.sync('**/docs.njk', { cwd: `${cwd}/src/components` })

  return files.map((file) => {
    return path.dirname(file)
  })
}

/**
 * Get a list of prototypes
 * @param {string} cwd Current working directory
 * @return {string[]}
 */
function prototypes (cwd) {
  let files = glob.sync('*.njk', { cwd: `${cwd}/src/prototypes` })

  return files.map((file) => {
    return path.basename(file, '.njk')
  })
}

module.exports = {
  components,
  prototypes
}
