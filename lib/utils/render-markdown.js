const marked = require('marked')

/**
 * Convert Markdown to HTML
 * @param {string} markdown Markdown source
 * @returns {string} HTML
 */
module.exports = function (markdown, options) {
  if (!markdown) {
    return ''
  }

  if (options.removeH1) {
    markdown = markdown.replace(/^#.+/, '')
  }

  return marked(markdown)
}
