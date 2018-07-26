const formatName = require('../utils/format-name')
const formatPath = require('../utils/format-path')
const fs = require('fs-extra')
const getConfig = require('../utils/get-config')
const nunjucks = require('nunjucks')
const path = require('path')
const StaticExtension = require('./static-extension')
const store = require('../utils/store')

const componentTemplate = fs
  .readFileSync(path.join(__dirname, '../../ui/templates/component.njk'))
  .toString()

const njComponentContext = path.join(__dirname, '../../ui/templates')
const njComponentLoader = new nunjucks.FileSystemLoader(njComponentContext)
const njComponentEnv = new nunjucks.Environment(njComponentLoader, { autoescape: false })

njComponentEnv.addExtension('static', new StaticExtension())

module.exports = function (src) {
  const callback = this.async()

  // Disable caching for now
  // TODO: Implement something with `this.addDependency`
  // SOLUTION: Probably something with a custom Nunjucks loader
  this.cacheable(false)

  const config = getConfig(this.rootContext)

  const relativePath = path.relative('src', this.resourcePath)
  const dirname = path.dirname(relativePath)
  const filename = path.basename(relativePath, '.njk')
  const docsPath = path.join(this.context, filename + '.md')
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

  let docs

  try {
    docs = fs.readFileSync(docsPath).toString()
  } catch (error) {}

  /**
   * Render component
   */
  const component = new Promise((resolve, reject) => {
    const options = {
      ...globalOptions,
      project: {
        name: (config.project && config.project.name) || 'Pangolin'
      },
      components: store.state.components,
      page: {
        name: formatName(relativePath),
        path: formatPath(dirname, filename),
        preview: `${filename}-preview.html`,
        template: `${filename}-template.html`,
        docs
      }
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
    const options = { ...globalOptions }

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
