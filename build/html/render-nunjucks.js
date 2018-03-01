const nunjucks = require('nunjucks')
const path = require('path')

const htmlUtils = require('./utils')
const pageList = require('./page-list')
const SectionExtension = require('./section-extension')

// Cache templates
const templates = {
  head: htmlUtils.loadTemplate('head'),
  sidebar: htmlUtils.loadTemplate('sidebar'),
  footer: htmlUtils.loadTemplate('footer'),
  components: htmlUtils.loadTemplate('components')
}

/**
 * Get page name and URL
 * @param {string} cwd Current working directory
 * @param {string} pageType `components` or `prototypes`
 * @param {string} currentFile The file currently being processed
 */
function pageObjects (cwd, pageType, currentFile) {
  return pageList[pageType](cwd).map((page) => {
    return {
      name: page.charAt(0).toUpperCase() + page.slice(1),
      url: pageType === 'components'
        ? `components/${page}.html`
        : `${page}.html`,
      active: pageType === 'components'
        ? `components/${page}` === path.dirname(currentFile)
        : page === path.basename(currentFile, '.njk')
    }
  })
}

/**
 * Render Nunjucks file to string
 * @param {string} cwd Current working directory
 * @param {string} file File to render
 * @return {Promise<string>}
 */
module.exports = function (cwd, file) {
  return new Promise((resolve, reject) => {
    // Create Nunjucks environment
    let env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(`${cwd}/src`)
    )

    // Prefix URL to make it relative
    env.addFilter('relative', (url) => {
      if (file.split(path.sep)[0] === 'components') {
        return `../${url}`
      } else {
        return url
      }
    })

    // Add custom section tag
    env.addExtension('SectionExtension', new SectionExtension())

    // Add environment variables to Nunjucks
    env.addGlobal('process', {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        FESG_ENV: process.env.FESG_ENV
      }
    })

    const head = () => {
      let html = new nunjucks.Template(templates.head, env).render()

      return new nunjucks.runtime.SafeString(html)
    }

    const sidebar = () => {
      let html = new nunjucks.Template(templates.sidebar, env).render({
        components: pageObjects(cwd, 'components', file),
        prototypes: pageObjects(cwd, 'prototypes', file)
      })

      return new nunjucks.runtime.SafeString(html)
    }

    const footer = () => {
      let html = new nunjucks.Template(templates.footer, env).render()

      return new nunjucks.runtime.SafeString(html)
    }

    const components = () => {
      return new nunjucks.Template(templates.components, env)
    }

    // Add components, footer, and sidebar templates
    env.addGlobal('fesg', {
      head: head(),
      sidebar: sidebar(),
      footer: footer(),
      components: components()
    })

    env.render(file, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
