const glob = require('glob')
const path = require('path')

function getPrototypeList (paths) {
  const htmlPrototypesPath = `${paths.src}/prototypes`

  return glob.sync(`${htmlPrototypesPath}/**/*.njk`)
    .map(item => path.relative(htmlPrototypesPath, item)
      .replace('.njk', '').replace(/\\/g, '/'))
}

module.exports = getPrototypeList
