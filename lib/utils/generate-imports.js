const fs = require('fs')
const path = require('path')

const getComponents = require('./get-components')
const getTemplates = require('./get-templates')
const store = require('../store')

/**
 * Generate components docs index file
 * @param {string} context Project directory
 */
function generateImports (context) {
  const { files, tree } = getComponents(context)
  const templates = getTemplates(context)
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
