const fs = require('fs')
const path = require('path')
const store = require('../store.js')

const templatePath = path.join(__dirname, '../../ui/index.html')
const template = fs.readFileSync(templatePath).toString()

/**
 * Generate index html
 * @returns {String} Index HTML
 */
module.exports = function () {
  const project = store.state.config.project.name
  const favicon = store.state.config.project.branding.favicon

  const base = process.env.PANGOLIN_ENV === 'dev'
    ? '/'
    : store.state.config.project.base

  const socketPath = process.env.PANGOLIN_ENV === 'dev'
    ? store.state.config.devServer.webSocketPath
    : ''

  return template
    .replace(/{{ project }}/g, project)
    .replace(/{{ favicon }}/g, favicon)
    .replace(/{{ base }}/g, base)
    .replace(/{{ socketPath }}/g, socketPath)
}
