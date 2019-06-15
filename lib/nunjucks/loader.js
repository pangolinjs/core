const formatName = require('../utils/format-name')
const formatPath = require('../utils/format-path')
const generatePreviewHead = require('./generate-preview-head')
const generatePreviewTemplate = require('./generate-preview-template')
const nunjucks = require('nunjucks')
const path = require('path')
const readFileSync = require('../utils/read-file-sync')
const renderMarkdown = require('../utils/render-markdown')
const StaticExtension = require('./static-extension')
const store = require('../store')

const componentPath = path.join(__dirname, '../../ui/templates/component.njk')
const componentTemplate = readFileSync(componentPath)

/* Set up component environment */

const njComponentContext = path.join(__dirname, '../../ui/templates')
const njComponentLoader = new nunjucks.FileSystemLoader(njComponentContext)
const njComponentEnv = new nunjucks.Environment(njComponentLoader, { autoescape: false })

njComponentEnv.addExtension('static', new StaticExtension())

/* Set up preview environment */

const njPreviewContext = path.join(store.state.cwd, 'src')
const njpreviewLoader = new nunjucks.FileSystemLoader(njPreviewContext, { noCache: true })
const njPreviewEnv = new nunjucks.Environment(njpreviewLoader, { autoescape: false })

njPreviewEnv.addExtension('static', new StaticExtension())

// Add custom Nunjucks filters to preview environment
for (let filter in store.state.config.nunjucks.filters) {
  njPreviewEnv.addFilter(filter, store.state.config.nunjucks.filters[filter])
}

// Add custom Nunjucks tags to preview environment
for (let extension in store.state.config.nunjucks.extensions) {
  njPreviewEnv.addExtension(extension, new store.state.config.nunjucks.extensions[extension]())
}

/* Loader logic */

module.exports = function (src) {
  // Mark loader as async
  const callback = this.async()

  // Disable caching for now
  // TODO: Implement something with `this.addDependency`
  // SOLUTION: Probably something with a custom Nunjucks loader
  this.cacheable(false)

  const relativePath = path.relative('src', this.resourcePath)
  const dirname = path.dirname(relativePath)
  const filename = path.basename(relativePath, '.njk')
  const pageConfigPath = path.join(this.context, filename + '.json')
  const pageDocsPath = path.join(this.context, filename + '.md')
  const outputPath = path.join(dirname, filename).split(path.sep).join('/')

  const pageConfig = JSON.parse(readFileSync(pageConfigPath) || '{}')
  const pageDocs = readFileSync(pageDocsPath)

  const previewTemplate = generatePreviewTemplate({
    template: pageConfig.template,
    head: generatePreviewHead(),
    body: src
  })

  /**
   * Render component
   */
  const component = new Promise((resolve, reject) => {
    const options = {
      components: store.state.components,
      page: {
        name: formatName(filename),
        path: formatPath(dirname, filename),
        preview: `${filename}-preview.html`,
        template: `${filename}-template.html`,
        docs: renderMarkdown(pageDocs, { removeH1: true })
      },
      project: {
        name: store.state.config.project.name,
        branding: store.state.config.project.branding
      }
    }

    if (process.env.PANGOLIN_ENV === 'dev') {
      options.webSocketPath = store.state.config.devServer.webSocketPath
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
      process: {
        env: {
          NODE_ENV: process.env.NODE_ENV,
          PANGOLIN_ENV: process.env.PANGOLIN_ENV
        }
      },
      page: {
        name: formatName(filename)
      },
      project: {
        name: store.state.config.project.name
      }
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

      callback(null, `module.exports = ${JSON.stringify(`${outputPath}-preview.html`)};`)
    })
    .catch(error => {
      callback(error)
    })
}
