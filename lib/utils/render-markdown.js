const marked = require('marked')
const prism = require('prismjs')
const store = require('../store')

require('prismjs/components/')()

marked.setOptions({
  breaks: true,
  gfm: true,
  highlight (code, lang) {
    const html = prism.highlight(code, prism.languages[lang], lang)
    return html
  },
  smartypants: true,
  tables: true
})

/**
 * Convert Markdown to HTML
 * @param {string} markdown Markdown source
 * @returns {string} HTML
 */
module.exports = function (markdown, options = {}) {
  if (!markdown || typeof markdown !== 'string') {
    return ''
  }

  if (options.removeH1) {
    markdown = markdown.replace(/^#.+/, '')
  }

  return marked(markdown, {
    baseUrl: store.state.config.project.base
  })
}
