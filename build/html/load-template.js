const fs = require('fs')
const path = require('path')

/**
 * Load template as string
 * @param {string} name Template name
 */
module.exports = function (name) {
  return fs.readFileSync(
    path.resolve(__dirname, `../../docs/templates/${name}.njk`)
  ).toString()
}
