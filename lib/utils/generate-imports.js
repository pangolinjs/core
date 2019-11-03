const fs = require('fs')
const path = require('path')

const getPageData = require('./get-page-data')
const getTemplateData = require('./get-template-data')
const store = require('../store')

/**
 * Generate components docs index file
 * @param {string} context Project directory
 */
function generateImports (context) {
  const { files, tree } = getPageData(context)
  const templates = getTemplateData(context)
  const tempPath = path.join(context, '.temp')

  store.state.components = tree
  store.state.templates = templates

  const output = files
    .slice()
    .map(file => `import '@/${file}'`)
    .join('\n')

  fs.mkdirSync(tempPath, { recursive: true })
  fs.writeFileSync(path.join(tempPath, 'html.js'), output)
}

module.exports = generateImports
