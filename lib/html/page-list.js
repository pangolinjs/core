const glob = require('fast-glob')
const path = require('path')

/**
 * Get a list of components
 * @param {string} context Project directory
 * @return {string[]}
 */
function components (context) {
  const files = glob.sync('**/docs.md', {
    cwd: path.join(context, 'src/components')
  })

  return files.map(file => path.dirname(file))
}

/**
 * Get a list of prototypes
 * @param {string} context Project directory
 * @return {string[]}
 */
function prototypes (context) {
  const files = glob.sync('*.njk', {
    cwd: path.join(context, 'src/prototypes')
  })

  return files.map(file => path.basename(file, '.njk'))
}

module.exports = {
  components,
  prototypes
}
