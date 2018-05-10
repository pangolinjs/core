const loadDocsTemplate = require('./load-docs-template')
const grayMatter = require('gray-matter')
const nunjucks = require('nunjucks')
const path = require('path')

// Cache docs templates
// TODO: Implement docs navigation
const docsTemplates = {
  head: loadDocsTemplate('head')
}

module.exports = function (src, map, meta) {
  // Mark loader as asynchronous
  const callback = this.async()

  // Disable caching for now
  // TODO: Implement something with 'this.addDependency'
  // SOLUTION: Probably something with a custom Nunjucks loader
  this.cacheable(false)

  // If metadata doesn't come from previous loader
  // we have to manually extract it from frontmatter
  if (!meta) {
    const matter = grayMatter(src)

    src = matter.content
    meta = matter.data
  }

  let template

  // Inject Nunjucks 'extends' based on frontmatter template
  if (meta.template) {
    template = `{% extends "${meta.template}" %}{% block body %}${src}{% endblock %}`
  } else {
    template = src
  }

  // Create file system loader for Nunjucks
  const loader = new nunjucks.FileSystemLoader(path.join(process.cwd(), 'src'))

  // Create Nunjucks environment
  const env = new nunjucks.Environment(loader, { autoescape: false })

  // Add 'relative' filter to Nunjucks
  env.addFilter('relative', url => {
    if (path.dirname(this.context).endsWith('components')) {
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

  // Add front matter as global Nunjucks variable
  env.addGlobal('page', meta)

  // Render page and return results via webpack callback
  env.renderString(template, (error, result) => {
    if (error) return callback(error)

    // Pass content to next loader
    callback(null, result)
  })
}
