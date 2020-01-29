const fs = require('fs')
const marked = require('marked')
const Prism = require('prismjs')

marked.setOptions({
  gfm: true,
  headerPrefix: 'docs-',
  smartypants: true,
  highlight (code, language) {
    return Prism.highlight(code, Prism.languages[language], language)
  }
})

/**
 * Get component docs
 * @param {string} filePath Docs file path
 * @returns {string} Component docs
 */
module.exports = function (filePath) {
  try {
    const markdown = fs.readFileSync(filePath).toString()
    return marked(markdown)
  } catch {
    return ''
  }
}
