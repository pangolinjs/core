const Prism = require('prismjs')
const PrismLoadLanguage = require('prismjs/components/')

const PRISM_LANGUAGE = 'django'

PrismLoadLanguage([PRISM_LANGUAGE])

Prism.hooks.add('wrap', env => {
  if (env.language !== PRISM_LANGUAGE) {
    return
  }

  if (env.type !== 'string') {
    return
  }

  if (!env.content.startsWith('"components/') && !env.content.endsWith('.njk"')) {
    return
  }

  const content = env.content.slice(1, -1)
  const href = env.content.slice(1, -5)

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
