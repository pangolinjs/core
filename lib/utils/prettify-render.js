const path = require('path')
const prettier = require('prettier')

/**
 * Prettify render (HTML)
 * @param {string} render HTML input
 * @returns {string} Prettified HTML output
 */
module.exports = function (render) {
  return prettier.format(render, {
    parser: 'html-enhanced',
    plugins: [path.join(__dirname, 'prettify-parser')]
  })
}
