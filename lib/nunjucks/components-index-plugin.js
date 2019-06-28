const nunjucks = require('nunjucks')
const path = require('path')
const readFileSync = require('../utils/read-file-sync')
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
    compiler.hooks.emit.tapAsync('PangolinComponentsIndexPlugin', (compilation, callback) => {
      const hasComponents = Object
        .keys(compilation.assets)
        .some(asset => asset.endsWith('.html'))

      if (!hasComponents) {
        return callback()
      }

      const options = {
        components: store.state.components,
        page: {
          name: 'Introduction'
        },
        project: {
          name: store.state.config.project.name,
          branding: store.state.config.project.branding
        }
      }

      if (process.env.PANGOLIN_ENV === 'dev') {
        options.webSocketPath = store.state.config.devServer.webSocketPath
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
