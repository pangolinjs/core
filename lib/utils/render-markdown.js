const marked = require('marked')
const prism = require('prismjs')

require('prismjs/components/')()

marked.setOptions({
  gfm: true,
  highlight (code, lang) {
    const html = prism.highlight(code, prism.languages[lang], lang)
    return html
  }
})

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
