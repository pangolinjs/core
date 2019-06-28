const generateIndex = require('../utils/generate-index.js')
const store = require('../store.js')

module.exports = class PangolinPlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('Pangolin', compilation => {
      // Serialize components data
      const components = JSON.stringify(store.state.components)

      // Add `components.json` to assets
      compilation.assets['components.json'] = {
        source: () => components,
        size: () => components.length
      }

      // Create index file
      const index = generateIndex({
        title: `Pattern Library | ${store.state.config.project.name}`
      })

      // Add `index.html` to assets
      compilation.assets['index.html'] = {
        source: () => index,
        size: () => index.length
      }
    })
  }
}
