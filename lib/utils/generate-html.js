const fs = require('fs')
const path = require('path')
const store = require('../store.js')

const TEMPLATE_PATH = path.join(__dirname, '../../ui/index.html')
const TEMPLATE_CONTENT = fs.readFileSync(TEMPLATE_PATH).toString()

let cache = ''

/**
 * Generate HTML file
 * @returns {String} Index HTML
 */
module.exports = function () {
  if (cache) {
    return cache
  }

  const project = store.state.config.project.name
  const favicon = store.state.config.project.branding.favicon

  const base = process.env.PANGOLIN_ENV === 'dev'
    ? '/'
    : store.state.config.project.base

  const socketPath = process.env.PANGOLIN_ENV === 'dev'
    ? store.state.config.devServer.webSocketPath
    : ''

  cache = TEMPLATE_CONTENT
    .replace(/{{ project }}/g, project)
    .replace(/{{ favicon }}/g, favicon)
    .replace(/{{ base }}/g, base)
    .replace(/{{ socketPath }}/g, socketPath)

  return cache
}
