const fs = require('fs-extra')
const path = require('path')
const store = require('../store.js')

const template = fs.readFileSync(path.join(__dirname, '../../ui/index.html')).toString()

/**
 * Generate index html
 * @returns {String} Index HTML
 */
module.exports = function () {
  const project = store.state.config.project.name

  const base = process.env.PANGOLIN_ENV === 'dev'
    ? '/'
    : store.state.config.project.base

  const socketPath = process.env.PANGOLIN_ENV === 'dev'
    ? store.state.config.devServer.webSocketPath
    : ''

  return template
    .replace(/{{ project }}/g, project)
    .replace(/{{ base }}/g, base)
    .replace(/{{ socketPath }}/g, socketPath)
}
