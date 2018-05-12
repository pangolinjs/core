const loadDocsTemplate = require('./load-docs-template')
const metadata = require('./metadata')
const normalizeResourcePath = require('./normalize-resourcepath')
const nunjucks = require('nunjucks')
const path = require('path')
const typeFromPath = require('./type-from-path')

// Cache docs templates
// TODO: Implement docs navigation
const docsTemplates = {
  head: loadDocsTemplate('head')
}

/**
 * Convert Nunjucks into HTML
 * @param {string} src File content
 */
module.exports = function (src) {
  // Mark loader as asynchronous
  const callback = this.async()

  // Disable caching for now
  // TODO: Implement something with 'this.addDependency'
  // SOLUTION: Probably something with a custom Nunjucks loader
  this.cacheable(false)

  const type = typeFromPath(this.resourcePath)
  const resourcePath = normalizeResourcePath(this.resourcePath)
  const pageMeta = metadata.state[type][resourcePath]
  const siteMeta = metadata.state

  let template

  // Inject Nunjucks 'extends' based on frontmatter template
  if (pageMeta.template) {
    template = `{% extends "${pageMeta.template}" %}{% block body %}${src}{% endblock %}`
  } else {
    template = src
  }

  // Create file system loader for Nunjucks
  const loader = new nunjucks.FileSystemLoader(path.join(process.cwd(), 'src'))

  // Create Nunjucks environment
  const env = new nunjucks.Environment(loader, { autoescape: false })

  // Add 'relative' filter to Nunjucks
  env.addFilter('relative', url => {
    if (type === 'components') {
      return `../${url}`
    } else {
      return url
    }
  })

  // Add environment variables as global Nunjucks variable
  env.addGlobal('process', {
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PANGOLIN_ENV: process.env.PANGOLIN_ENV
    }
  })

  // Add Pangolin templates as global Nunjucks variable
  env.addGlobal('pangolin', {
    head: new nunjucks.Template(docsTemplates.head, env).render()
  })

  // Add metadata as global Nunjucks variable
  env.addGlobal('page', pageMeta)
  env.addGlobal('site', siteMeta)

  // Render page and return results via webpack callback
  env.renderString(template, (error, result) => {
    if (error) return callback(error)

    // Pass content to next loader
    callback(null, result)
  })
}
