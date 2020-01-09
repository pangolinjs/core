const generateHTML = require('../utils/generate-html.js')
const store = require('../store.js')

module.exports = class PangolinPlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('Pangolin', compilation => {
      const project = JSON.stringify(store.state.config.project)
      const templates = JSON.stringify(store.state.templates)
      const components = JSON.stringify(store.state.components)
      const index = generateHTML()

      compilation.assets['pangolin/project.json'] = {
        source: () => project,
        size: () => project.length
      }

      compilation.assets['pangolin/templates.json'] = {
        source: () => templates,
        size: () => templates.length
      }

      compilation.assets['pangolin/components.json'] = {
        source: () => components,
        size: () => components.length
      }

      compilation.assets['index.html'] = {
        source: () => index,
        size: () => index.length
      }

      store.state.templates.forEach(template => {
        compilation.assets[`${template.path}/index.html`] = {
          source: () => index,
          size: () => index.length
        }

        compilation.assets[`${template.path}/source.html`] = {
          source: () => template.source,
          size: () => template.source.length
        }
      })
    })
  }
}
