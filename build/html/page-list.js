const glob = require('glob')
const path = require('path')

/**
 * Get a list of components
 * @param {string} context Project directory
 * @return {string[]}
 */
function components (context) {
  let files = glob.sync('**/docs.njk', { cwd: path.join(context, 'src/components') })

  return files.map(file => {
    return path.dirname(file)
  })
}

/**
 * Get a list of prototypes
 * @param {string} context Project directory
 * @return {string[]}
 */
function prototypes (context) {
  let files = glob.sync('*.njk', { cwd: path.join(context, 'src/prototypes') })

  return files.map(file => {
    return path.basename(file, '.njk')
  })
}

module.exports = {
  components,
  prototypes
}
