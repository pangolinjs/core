const showdown = require('showdown')

const converter = new showdown.Converter()

/**
 * Convert Markdown to HTML
 * @param {string} src Markdown source
 * @returns {string} HTML result
 */
module.exports = function (src) {
  return converter.makeHtml(src)
}
