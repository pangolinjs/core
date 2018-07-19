const path = require('path')

module.exports = function (content) {
  const relativePath = path.relative('src/components', this.resourcePath)
  const dirname = path.dirname(relativePath)
  const filename = path.basename(relativePath, '.njk')

  const outputPath = path
    .join(dirname, filename)
    .split(path.sep)
    .join('/')

  this.emitFile(`${outputPath}.html`, content)
  this.emitFile(`${outputPath}-preview.html`, content)

  return `module.exports = ${JSON.stringify(outputPath + '-preview.html')}`
}
