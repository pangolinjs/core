const formatName = require('../utils/format-name')
const formatPath = require('../utils/format-path')
const generatePreviewHead = require('./generate-preview-head')
const generatePreviewTemplate = require('./generate-preview-template')
const getConfig = require('../utils/get-config')
const nunjucks = require('nunjucks')
const path = require('path')
const readFileSync = require('../utils/read-file-sync')
const StaticExtension = require('./static-extension')
const store = require('../utils/store')

const componentTemplate = readFileSync(path.join(__dirname, '../../ui/templates/component.njk'))

const njComponentContext = path.join(__dirname, '../../ui/templates')
const njComponentLoader = new nunjucks.FileSystemLoader(njComponentContext)
const njComponentEnv = new nunjucks.Environment(njComponentLoader, { autoescape: false })

njComponentEnv.addExtension('static', new StaticExtension())

// Cache config
let config

module.exports = function (src) {
  const callback = this.async()

  // Disable caching for now
  // TODO: Implement something with `this.addDependency`
  // SOLUTION: Probably something with a custom Nunjucks loader
  this.cacheable(false)

  if (!config) {
    config = getConfig(this.rootContext)
  }

  const relativePath = path.relative('src', this.resourcePath)
  const dirname = path.dirname(relativePath)
  const filename = path.basename(relativePath, '.njk')
  const pageConfigPath = path.join(this.context, filename + '.json')
  const pageDocsPath = path.join(this.context, filename + '.md')
  const outputPath = path.join(dirname, filename).split(path.sep).join('/')
  const projectBase = (config.project && config.project.base) || '/'

  const njPreviewContext = path.join(this.rootContext, 'src')
  const njpreviewLoader = new nunjucks.FileSystemLoader(njPreviewContext)
  const njPreviewEnv = new nunjucks.Environment(njpreviewLoader, { autoescape: false })

  const pageConfig = JSON.parse(readFileSync(pageConfigPath) || '{}')
  const pageDocs = readFileSync(pageDocsPath)

  const previewHead = generatePreviewHead(projectBase)
  const previewTemplate = generatePreviewTemplate(src, pageConfig.template)

  njPreviewEnv.addExtension('static', new StaticExtension())

  const globalOptions = {
    process: {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PANGOLIN_ENV: process.env.PANGOLIN_ENV
      }
    },
    project: {
      base: projectBase
    },
    page: {
      name: formatName(relativePath)
    }
  }

  /**
   * Render component
   */
  const component = new Promise((resolve, reject) => {
    const options = {
      ...globalOptions,
      project: {
        ...globalOptions.project,
        name: (config.project && config.project.name) || 'Pangolin',
        theme: (config.project && config.project.theme)
      },
      components: store.state.components,
      page: {
        ...globalOptions.page,
        path: formatPath(dirname, filename),
        preview: `${filename}-preview.html`,
        template: `${filename}-template.html`,
        docs: pageDocs
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
      resolve(result.replace(/(<\/head\s*>)/i, `${previewHead}\n</head>`))
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
