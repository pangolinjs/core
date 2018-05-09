const loadDocsTemplate = require('./load-docs-template')
const matter = require('gray-matter')
const nunjucks = require('nunjucks')
const parseMarkdown = require('./parse-markdown')
const path = require('path')

const docsTemplates = {
  head: loadDocsTemplate('head')
}

module.exports = function (src) {
  // Mark loader as asynchronous
  const callback = this.async()

  // Disable caching for now
  // TODO: Implement something with 'this.addDependency'
  // SOLUTION: Propably something with a custom Nunjucks loader
  this.cacheable(false)

  // Extract front matter and content
  const { data: frontmatter, content } = matter(src)

  // Parse content as markdown based on loader options
  const parsedContent = this.query.parseMarkdown
    ? parseMarkdown(content)
    : content

  // Inject Nunjucks 'extends' based on frontmatter template
  const template = frontmatter.template
    ? [
      `{% extends "${frontmatter.template}" %}`,
      '{% block body %}',
      parsedContent,
      '{% endblock %}'
    ].join('')
    : parsedContent

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
  env.addGlobal('page', frontmatter)

  // Render page and return results via webpack callback
  env.renderString(template, (error, result) => {
    if (error) return callback(error)

    callback(null, result)
  })
}
