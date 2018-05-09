const showdown = require('showdown')
const showdownContainer = require('./showdown-container')

const converter = new showdown.Converter({
  extensions: [showdownContainer]
})

/**
 * Convert Markdown to HTML
 * @param {string} src Markdown source
 * @returns {string} HTML result
 */
module.exports = function (src) {
  return converter.makeHtml(src)
}
