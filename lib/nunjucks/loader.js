const fs = require('fs')
const nunjucks = require('nunjucks')
const path = require('path')
const StaticExtension = require('./static-extension')
const store = require('../utils/store')

const componentTemplate = fs
  .readFileSync(path.join(__dirname, '../../docs/templates/component.njk'))
  .toString()

const njComponentContext = path.join(__dirname, '../../docs/templates')
const njComponentLoader = new nunjucks.FileSystemLoader(njComponentContext)
const njComponentEnv = new nunjucks.Environment(njComponentLoader, { autoescape: false })

njComponentEnv.addExtension('static', new StaticExtension())

module.exports = function (src) {
  const callback = this.async()

  // Disable caching for now
  // TODO: Implement something with 'this.addDependency'
  // SOLUTION: Probably something with a custom Nunjucks loader
  this.cacheable(false)

  const relativePath = path.relative('src', this.resourcePath)
  const dirname = path.dirname(relativePath)
  const filename = path.basename(relativePath, '.njk')
  const outputPath = path.join(dirname, filename).split(path.sep).join('/')

  const njPreviewContext = path.join(this.rootContext, 'src')
  const njpreviewLoader = new nunjucks.FileSystemLoader(njPreviewContext)
  const njPreviewEnv = new nunjucks.Environment(njpreviewLoader, { autoescape: false })

  njPreviewEnv.addExtension('static', new StaticExtension())

  const previewTemplate =
    '{% extends "main.njk" %}' +
    '{% block body %}' + src + '{% endblock %}'

  const globalOptions = {
    output_path: outputPath,
    process: {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PANGOLIN_ENV: process.env.PANGOLIN_ENV
      }
    }
  }

  /**
   * Render component
   */
  const component = new Promise((resolve, reject) => {
    const options = {
      ...globalOptions,
      components: store.state.components,
      preview_url: `${filename}-preview.html`
    }

    njComponentEnv.renderString(componentTemplate, options, (error, result) => {
      if (error) { return reject(error) }
      resolve(result)
    })
  })

  /**
   * Render preview
   */
  const preview = new Promise((resolve, reject) => {
    const options = {
      ...globalOptions
    }

    njPreviewEnv.renderString(previewTemplate, options, (error, result) => {
      if (error) { return reject(error) }
      resolve(result)
    })
  })

  Promise.all([component, preview])
    .then(values => {
      this.emitFile(`${outputPath}.html`, values[0])
      this.emitFile(`${outputPath}-preview.html`, values[1])
      this.emitFile(`${outputPath}-template.html`, src)

      callback(null, `module.exports = ${JSON.stringify(outputPath + '-preview.html')};`)
    })
    .catch(error => {
      callback(error)
    })
}
