const fs = require('fs-extra')

function getComponentList (paths) {
  return fs.readdirSync(`${paths.src}/components`)
    .map(item => `components/${item}`)
}

module.exports = getComponentList
