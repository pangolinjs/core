const fs = require('fs-extra')
const store = require('../store.js')

const template = fs.readFileSync('../../ui/index.html').toString()

/**
 * Generate index html
 * @returns {String} Index HTML
 */
module.exports = function () {
  return template
    .replace(/{{ project }}/g, store.state.config.project.name)
    .replace(/{{ base }}/g, store.state.config.project.base)
    .replace(/{{ socketPath }}/g, store.state.config.devServer.webSocketPath)
}
