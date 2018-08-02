const marked = require('marked')

/**
 * Convert Markdown to HTML
 * @param {string} markdown Markdown source
 * @returns {string} HTML
 */
module.exports = function (markdown) {
  if (!markdown) {
    return ''
  }

  return marked(markdown)
}
