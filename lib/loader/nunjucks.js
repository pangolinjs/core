const fs = require('fs')
const nunjucks = require('nunjucks')
const path = require('path')

const docsTemplate = fs.readFileSync(path.join(__dirname, '../../docs/templates/component.njk')).toString()

module.exports = function (content) {
  const callback = this.async()

  const relativePath = path.relative('src/components', this.resourcePath)
  const dirname = path.dirname(relativePath)
  const filename = path.basename(relativePath, '.njk')

  const outputPath = path
    .join(dirname, filename)
    .split(path.sep)
    .join('/')

  const nunjucksContext = path.join(this.rootContext, 'src')
  const nunjucksLoader = new nunjucks.FileSystemLoader(nunjucksContext)
  const nunjucksEnv = new nunjucks.Environment(nunjucksLoader, { autoescape: false })

  const component = nunjucks.renderString(docsTemplate, { preview_url: `${filename}-preview.html` })
  const preview = `{% extends "main.njk" %}{% block body %}${content}{% endblock %}`

  nunjucksEnv.renderString(preview, (error, result) => {
    if (error) return callback(error)

    this.emitFile(`${outputPath}.html`, component)
    this.emitFile(`${outputPath}-preview.html`, result)
    this.emitFile(`${outputPath}-template.html`, content)

    const loaderResult = `module.exports = ${JSON.stringify(outputPath + '-preview.html')};`
    callback(null, loaderResult)
  })
}
