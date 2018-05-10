const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')

const RE = /^(```+|~~~+)(\w*)\n([\s\S]*?)\n\1/gm

const defaultLanguages = [
  'clike',
  'css',
  'html',
  'javascript',
  'js',
  'markup',
  'mathml',
  'svg',
  'xml'
]

/**
 * Create code block markup with Prism highlighting
 * @param {string} lang Code language
 * @param {string} content Code itself
 * @returns {string} Code markup
 */
function createCodeBlock (lang, content) {
  if (!defaultLanguages.includes(lang)) {
    loadLanguages([lang])
  }

  let output = `<pre class="language-${lang}"><code>`

  if (lang) {
    output += Prism.highlight(content, Prism.languages[lang], lang)
  } else {
    output += content
  }

  output += `</code></pre>`

  return output
}

module.exports = {
  type: 'lang',
  filter (text) {
    return text.replace(RE, (match, token, lang, content) => createCodeBlock(lang, content))
  }
}
