const path = require('path')

function htmlMetaPath (paths, fileName) {
  fileName = fileName.replace('.njk', '').replace(/\\/g, '/')

  const toRoot = path.relative(path.dirname(`${paths.dev}/${fileName}`), paths.dev).replace(/\\/g, '/') + '/'

  return {
    filePath: `${fileName}.html`,
    fileName: `${path.basename(fileName)}.html`,
    toRoot: toRoot === '/' ? '' : toRoot
  }
}

module.exports = htmlMetaPath
