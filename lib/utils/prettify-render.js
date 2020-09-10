const prettier = require('prettier')

/**
 * Prettify render (HTML)
 * @param {string} render HTML input
 * @returns {string} Prettified HTML output
 */
module.exports = function (render) {
  return prettier.format(render, {
    parser: 'html',
    printWidth: 100
  })
}
