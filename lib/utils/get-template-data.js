const fs = require('fs')
const glob = require('fast-glob')
const path = require('path')

/**
 * Get template data
 * @param {string} context Current working directory
 * @returns {Object<string, string>} Templates
 */
module.exports = function (context) {
  const TEMPLATE_DIR = `${context}/src/templates`

  const files = glob.sync(`${TEMPLATE_DIR}/**/*.njk`)
  const templates = {}

  files.forEach(file => {
    const name = path.relative(TEMPLATE_DIR, file)
    templates[name] = fs.readFileSync(file).toString()
  })

  return templates
}
