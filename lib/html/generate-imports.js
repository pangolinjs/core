const fs = require('fs-extra')
const pageList = require('./page-list')
const path = require('path')

const tempPath = path.resolve(__dirname, '../../docs/.temp')
fs.ensureDirSync(tempPath)

/**
 * Generate components import file
 * @param {string} context Project directory
 * @returns {string} Path to temp JS file
 */
function components (context) {
  const fileContent = pageList.components(context)
    .map(pageName => {
      const pagePath = path.join(context, 'src/components', pageName, 'docs.md')
      return `import ${JSON.stringify(pagePath)}`
    })
    .join('\n')

  const filePath = path.join(tempPath, 'components.js')

  fs.writeFileSync(filePath, fileContent)
  return filePath
}

/**
 * Generate prototypes import file
 * @param {string} context Project directory
 * @returns {string} Path to temp JS file
 */
function prototypes (context) {
  const fileContent = pageList.prototypes(context)
    .map(pageName => {
      const pagePath = path.join(context, 'src/prototypes', pageName + '.njk')
      return `import ${JSON.stringify(pagePath)}`
    })
    .join('\n')

  const filePath = path.join(tempPath, 'prototypes.js')

  fs.writeFileSync(filePath, fileContent)
  return filePath
}

module.exports = {
  components,
  prototypes
}
