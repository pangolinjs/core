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
 * @param {string} src File content
 * @returns {string} Converted content
 */
module.exports = function (src) {
  return converter.makeHtml(src)
}
