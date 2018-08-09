const store = require('../store')
const path = require('path')

/**
 * Get project configuration
 * @param {string} context Project directory
 * @returns {Object} Configuration
 */
module.exports = (context) => {
  // Check whether config is already available in the store
  if (store.config) {
    return store.config
  }

  const config = require(path.join(context, 'pangolin.config.js'))

  if (!config.devServer) {
    config.devServer = {}
  }

  if (!config.devServer.port) {
    config.devServer.port = 8080
  }

  if (!config.project) {
    config.project = {}
  }

  if (!config.project.name) {
    config.project.name = 'Pangolin'
  }

  if (!config.project.base) {
    config.project.base = '/'
  }

  if (config.project.branding) {
    config.project.branding = {
      'color-theme': config.project.branding.colorTheme,
      'color-title': config.project.branding.colorTitle,
      'font-family': config.project.branding.fontFamily
    }
  }

  return config
}
