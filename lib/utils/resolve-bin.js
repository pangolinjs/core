const path = require('path')

/**
 * Get the corresponding bin path for a module
 * @param {String} moduleName Name of the module
 * @returns {String} Absolute path to bin file
 */
function resolveBin (moduleName) {
  // Get the directory from the module's package.json path
  const directory = path.dirname(require.resolve(`${moduleName}/package.json`))

  // Get the relative bin path from the module's package.json bin key
  let bin = require(`${moduleName}/package.json`).bin

  // Sometimes the bin file isn't a string but an object
  // This extracts the first bin from that object
  if (typeof bin !== 'string') {
    bin = Object.values(bin)[0]
  }

  return path.join(directory, bin)
}

module.exports = resolveBin
