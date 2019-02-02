const lintCSS = require('../utils/lint-css')
const lintJS = require('../utils/lint-js')

/**
 * Lint code
 * @param {Object} options Options
 * @param {'css'|'js'} options.language Lint CSS/SCSS or JavaScript
 * @param {Array} [options.arguments] Optional arguments for the linters
 */
function lint (options) {
  if (!options.language) {
    throw new Error('options.language missing')
  }

  if (!Array.isArray(options.arguments)) {
    throw new TypeError('options.arguments has to be an array')
  }

  process.env.NODE_ENV = 'development'

  if (options.language === 'css') {
    process.env.PANGOLIN_ENV = 'lint:css'

    lintCSS(options.arguments)
      ? process.exit(0)
      : process.exit(1)
  }

  if (options.language === 'js') {
    process.env.PANGOLIN_ENV = 'lint:js'

    lintJS(options.arguments)
      ? process.exit(0)
      : process.exit(1)
  }
}

module.exports = lint
