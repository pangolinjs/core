const fs = require('fs-extra')
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

  store.state.components = tree
  store.state.templates = templates

  const output = files
    .slice()
    .map(file => `import '@/${file}'`)
    .join('\n')

  fs.ensureDirSync(path.join(context, '.temp'))
  fs.writeFileSync(path.join(context, '.temp/html.js'), output)
}

module.exports = generateImports
