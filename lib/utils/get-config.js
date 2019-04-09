const store = require('../store')
const path = require('path')

/**
 * Get project configuration
 * @param {string} context Project directory
 * @returns {Object} Configuration
 */
module.exports = (context) => {
  // Check whether config is already available in the store
  if (store.state.config) {
    return store.state.config
  }

  const config = require(path.join(context, 'pangolin.config.js'))

  if (!config.devServer) {
    config.devServer = {}
  }

  if (process.env.PANGOLIN_HOST) {
    config.devServer.host = process.env.PANGOLIN_HOST
  }

  if (!config.devServer.host) {
    config.devServer.host = 'localhost'
  }

  if (process.env.PANGOLIN_PORT) {
    config.devServer.port = parseInt(process.env.PANGOLIN_PORT)
  }

  if (!config.devServer.port) {
    config.devServer.port = 8080
  }

  if (!config.nunjucks) {
    config.nunjucks = {}
  }

  if (!config.project) {
    config.project = {}
  }

  if (!config.project.name) {
    config.project.name = 'Pangolin'
  }

  if (process.env.PANGOLIN_BASE) {
    config.project.base = process.env.PANGOLIN_BASE
  }

  if (!config.project.base) {
    config.project.base = '/'
  }

  if (config.fileNameHash === undefined) {
    config.fileNameHash = true
  }

  return config
}
