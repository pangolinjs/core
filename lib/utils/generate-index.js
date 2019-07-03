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
  const base = store.state.config.project.base
  const socketPath = store.state.config.devServer.webSocketPath

  const output = template
    .replace(/{{ project }}/g, project)
    .replace(/{{ base }}/g, base)

  if (process.env.PANGOLIN_ENV === 'dev') {
    return output
      .replace(/{{ socketPath }}/g, socketPath)
  }

  return output
    .replace(/{{ socketPath }}/g, '')
}
