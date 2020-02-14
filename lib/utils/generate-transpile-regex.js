const path = require('path')

/**
 * Generate regex for transpilation
 * @param {string[]|RegExp[]} transpileDependencies Source dependencies
 * @returns {RegExp} Generated regex
 */
function generateTranspileRegex (transpileDependencies) {
  const deps = transpileDependencies.map(dep => {
    if (typeof dep === 'string') {
      return path.join('node_modules', dep).replace(/\\/g, '\\\\')
    }

    if (dep instanceof RegExp) {
      return dep.source
    }
  })

  if (deps.length) {
    return new RegExp(deps.join('|'))
  }

  return null
}

module.exports = generateTranspileRegex
