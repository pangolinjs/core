const nunjucks = require('nunjucks')
const path = require('path')
const readFileSync = require('../utils/read-file-sync')
const renderMarkdown = require('../utils/render-markdown')
const StaticExtension = require('./static-extension')
const store = require('../store')

const context = path.join(__dirname, '../../ui/templates')
const loader = new nunjucks.FileSystemLoader(context)
const env = new nunjucks.Environment(loader, { autoescape: false })

env.addExtension('static', new StaticExtension())

const indexPath = path.join(__dirname, '../../ui/templates/index.njk')
const template = readFileSync(indexPath)

module.exports = class ComponentsIndexPlugin {
  apply (compiler) {
    const readme = readFileSync(path.join(compiler.context, 'README.md'))

    compiler.hooks.emit.tapAsync('ComponentsIndexPlugin', (compilation, callback) => {
      const hasComponents = Object
        .keys(compilation.assets)
        .some(asset => asset.endsWith('.html'))

      if (!hasComponents) {
        return callback()
      }

      const options = {
        components: store.components,
        content: renderMarkdown(readme, { removeH1: true }),
        page: {
          name: 'Introduction'
        }
      }

      if (store.config.project) {
        options.project = {
          name: store.config.project.name || 'Pangolin',
          theme: store.config.project.theme
        }
      }

      env.renderString(template, options, (error, result) => {
        if (error) {
          return callback(error)
        }

        compilation.assets['index.html'] = {
          source: () => result,
          size: () => result.length
        }

        callback()
      })
    })
  }
}
