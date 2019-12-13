const nunjucks = require('nunjucks')
const path = require('path')

const formatName = require('../utils/format-name.js')
const generateHead = require('../nunjucks/generate-head.js')
const generateIndex = require('../utils/generate-index.js')
const generateSource = require('../nunjucks/generate-source.js')
const getComponentConfig = require('../utils/get-component-config.js')
const highlightSource = require('../utils/highlight-source.js')
const prettifyRender = require('../utils/prettify-render.js')
const StaticExtension = require('../nunjucks/static-extension.js')
const store = require('../store.js')

/**
 * Set up Nunjucks file system loader
 */
const nunjucksLoader = new nunjucks.FileSystemLoader(
  path.join(store.state.cwd, 'src'),
  { noCache: true }
)

/**
 * Set up Nunjucks environment
 */
const nunjucksEnvironment = new nunjucks.Environment(
  nunjucksLoader,
  { autoescape: false }
)

nunjucksEnvironment.addExtension('static', new StaticExtension())

/**
 * Add user-defined nunjucks filters
 */
for (const filter in store.state.config.nunjucks.filters) {
  nunjucksEnvironment.addFilter(
    filter,
    store.state.config.nunjucks.filters[filter]
  )
}

/**
 * Add user-defined Nunjucks extensions
 */
for (const extension in store.state.config.nunjucks.extensions) {
  nunjucksEnvironment.addExtension(
    extension,
    new store.state.config.nunjucks.extensions[extension]()
  )
}

module.exports = function (source) {
  // Mark loader as asynchronous
  const callback = this.async()

  // Disable caching for now
  // TODO: Implement something with `this.addDependency`
  // SOLUTION: Probably something with a custom Nunjucks loader
  this.cacheable(false)

  // Get source
  const sourceContext = path.relative('src', this.context)
  const sourceName = path.basename(this.resourcePath, path.extname(this.resourcePath))

  // Get config
  const config = getComponentConfig(`${this.context}/${sourceName}.json`)

  // Set output names
  const outputName = path.join(sourceContext, sourceName)
  const formattedName = formatName(sourceName)

  // Generate Nunjucks template
  const generatedSource = generateSource({
    template: config.template,
    head: generateHead(),
    body: source || ''
  })

  // Set Nunjucks context
  const options = {
    process: {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PANGOLIN_ENV: process.env.PANGOLIN_ENV
      }
    },
    page: {
      name: formattedName
    },
    project: {
      name: store.state.config.project.name
    }
  }

  // Render Nunjucks template and emit files
  nunjucksEnvironment.renderString(generatedSource, options, (error, render) => {
    if (error) {
      return callback(error)
    }

    const highlightedSource = highlightSource(source)

    this.emitFile(`${outputName}/index.html`, generateIndex())
    this.emitFile(`${outputName}/render.html`, prettifyRender(render))
    this.emitFile(`${outputName}/source.html`, highlightedSource)

    callback(null, '')
  })
}
