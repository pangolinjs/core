const fs = require('fs-extra')
const store = require('../store.js')

const template = fs.readFileSync('../../ui/index.html').toString()

/**
 * Generate index html
 * @param {Object} options Options
 * @param {String} options.title HTML `<title>` content
 * @returns {String} Index HTML
 */
module.exports = function (options) {
  return template
    .replace(/{{ title }}/g, options.title)
    .replace(/{{ base }}/g, store.state.config.project.base)
}
