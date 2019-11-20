const fs = require('fs')
const glob = require('fast-glob')
const path = require('path')

const formatName = require('../utils/format-name')
const highlightSource = require('../utils/highlight-source')

/**
 * Get template data
 * @param {string} context Current working directory
 * @returns {Object<string, string>} Templates
 */
module.exports = function (context) {
  const TEMPLATE_DIR = `${context}/src/templates`

  const files = glob.sync(`${TEMPLATE_DIR}/**/*.njk`)
  const templates = []

  files.forEach(file => {
    const templatePath = path
      .relative(TEMPLATE_DIR, file)
      // Cut of `.njk` file extension.
      .slice(0, -4)

    const templateName = templatePath
      .split('/')
      .map(formatName)
      .join(' / ')

    templates.push({
      id: `templates/${templatePath}`,
      path: `templates/${templatePath}`,
      name: templateName,
      source: highlightSource(fs.readFileSync(file).toString())
    })
  })

  return templates
}
