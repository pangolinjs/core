const generateIndex = require('../utils/generate-index.js')
const store = require('../store.js')

module.exports = class PangolinPlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('Pangolin', compilation => {
      const project = JSON.stringify(store.state.config.project)
      const components = JSON.stringify(store.state.components)
      const index = generateIndex()

      compilation.assets['project.json'] = {
        source: () => project,
        size: () => project.length
      }

      compilation.assets['components.json'] = {
        source: () => components,
        size: () => components.length
      }

      compilation.assets['index.html'] = {
        source: () => index,
        size: () => index.length
      }
    })
  }
}
