const Prism = require('prismjs')
const PrismLoadLanguage = require('prismjs/components/')

const PRISM_LANGUAGE = 'django'

const LINK_TYPE = 'string'
const LINK_START_KEYWORDS = ['components', 'templates']
const LINK_END_KEYWORD = '.njk"'

PrismLoadLanguage([PRISM_LANGUAGE])

Prism.hooks.add('wrap', env => {
  if (env.language !== PRISM_LANGUAGE) {
    return
  }

  if (env.type !== LINK_TYPE) {
    return
  }

  if (!env.content.endsWith(LINK_END_KEYWORD)) {
    return
  }

  if (!LINK_START_KEYWORDS.some(start => env.content.startsWith(`"${start}/`))) {
    return
  }

  // Remove starting and ending quotes.
  const content = env.content.slice(1, -1)

  // Remove starting quote and ending file extension.
  const href = env.content.slice(1, -LINK_END_KEYWORD.length)

  env.content = `"<a href="/${href}">${content}</a>"`
})

/**
 * Highlight component source
 * @param {string} source Component source
 * @returns {string} Highlighted source
 */
module.exports = function (source) {
  return Prism.highlight(source, Prism.languages.django, 'django')
}
