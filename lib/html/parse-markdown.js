const showdown = require('showdown')
const showdownContainer = require('./showdown-container')
const showdownHighlight = require('./showdown-highlight')

const converter = new showdown.Converter({
  extensions: [
    showdownContainer,
    showdownHighlight
  ],
  prefixHeaderId: 'pangolin-',
  rawPrefixHeaderId: true,
  strikethrough: true,
  tables: true
})

/**
 * Convert Markdown to HTML
 * @param {string} src Markdown source
 * @returns {string} HTML result
 */
module.exports = function (src) {
  return converter.makeHtml(src)
}
