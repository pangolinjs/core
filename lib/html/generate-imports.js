const fs = require('fs-extra')
const pageList = require('./page-list')
const path = require('path')

/**
 * Write temp file
 * @param {string} content File content
 * @param {'components'|'prototypes'} type Type of file to write
 * @returns {string} Temp file path
 */
function writeFile (content, type) {
  const tempPath = path.resolve(__dirname, '../../docs/.temp')
  fs.ensureDirSync(tempPath)

  const fileContent = content + '\n'
  const filePath = path.join(tempPath, type + '.js')

  fs.writeFileSync(filePath, fileContent)
  return filePath
}

/**
 * Generate components import file
 * @param {string} context Project directory
 * @returns {string} Path to temp JS file
 */
function components (context) {
  const content = pageList.components(context)
    .map(pageName => `import '@/components/${pageName}/docs.md'`)
    .join('\n')

  return writeFile(content, 'components')
}

/**
 * Generate prototypes import file
 * @param {string} context Project directory
 * @returns {string} Path to temp JS file
 */
function prototypes (context) {
  const content = pageList.prototypes(context)
    .map(pageName => `import '@/prototypes/${pageName}.njk'`)
    .join('\n')

  return writeFile(content, 'prototypes')
}

module.exports = {
  components,
  prototypes
}
