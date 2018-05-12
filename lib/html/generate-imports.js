const fs = require('fs-extra')
const metadata = require('./metadata')
const path = require('path')

const tempPath = path.resolve(__dirname, '../../docs/.temp')
fs.ensureDirSync(tempPath)

/**
 * Write temp file
 * @param {string} context Project directory
 * @param {'components'|'prototypes'} type Type of file to write
 * @returns {string} Temp file path
 */
function writeFile (context, type) {
  const outputPath = path.join(tempPath, type + '.js')
  const sourcePath = path.join(context, 'src')

  const content = Object.keys(metadata.state[type])
    .map(file => `import '${file.replace(sourcePath, '@')}'`)
    .join('\n') + '\n'

  fs.writeFileSync(outputPath, content)

  return outputPath
}

/**
 * Generate components import file
 * @returns {string} Path to temp JS file
 */
function components (context) {
  return writeFile(context, 'components')
}

/**
 * Generate prototypes import file
 * @returns {string} Path to temp JS file
 */
function prototypes (context) {
  return writeFile(context, 'prototypes')
}

module.exports = {
  components,
  prototypes
}
