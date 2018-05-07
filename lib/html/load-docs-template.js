const fs = require('fs-extra')
const path = require('path')

/**
 * Load docs template
 * @param {string} name Template name
 * @returns {string} Template content
 */
module.exports = function (name) {
  const filePath = path.resolve(__dirname, '../../docs/templates', name + '.njk')
  const fileContents = fs.readFileSync(filePath)

  return fileContents.toString()
}
