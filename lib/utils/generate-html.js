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

  const { PANGOLIN_ENV } = process.env

  const project = store.state.config.project.name
  const favicon = store.state.config.project.branding.favicon

  const base = PANGOLIN_ENV === 'dev'
    ? '/'
    : store.state.config.project.base

  const crossorigin = store.state.config.crossorigin
    ? `crossorigin="${store.state.config.crossorigin}"`
    : ''

  const socketPath = PANGOLIN_ENV === 'dev'
    ? store.state.config.devServer.webSocketPath
    : ''

  cache = TEMPLATE_CONTENT
    .replace(/{{ project }}/g, project)
    .replace(/{{ favicon }}/g, favicon)
    .replace(/{{ base }}/g, base)
    .replace(/{{ crossorigin }}/g, crossorigin)
    .replace(/{{ socketPath }}/g, socketPath)

  return cache
}
