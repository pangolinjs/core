const nunjucks = require('nunjucks')
const path = require('path')
const Prism = require('prismjs')
const PrismLoadLanguage = require('prismjs/components/')

const formatName = require('../utils/format-name.js')
const generateHead = require('../nunjucks/generate-head.js')
const generateIndex = require('../utils/generate-index.js')
const generateTemplate = require('../nunjucks/generate-template.js')
const readFileSync = require('../utils/read-file-sync.js')
const StaticExtension = require('../nunjucks/static-extension.js')
const store = require('../store.js')

PrismLoadLanguage(['django'])

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
  const configPath = path.join(this.context, `${sourceName}.json`)
  const config = JSON.parse(readFileSync(configPath) || '{}')

  // Defined output
  const outputName = path.join(sourceContext, sourceName)
  const formattedName = formatName(sourceName)

  // Create Nunjucks template
  const template = generateTemplate({
    template: config.template,
    head: generateHead(),
    body: source
  })

  // Define Nunjucks context options
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

  // Render Nunjucks template to string and emit files
  nunjucksEnvironment.renderString(template, options, (error, render) => {
    if (error) {
      return callback(error)
    }

    this.emitFile(`${outputName}/index.html`, generateIndex())
    this.emitFile(`${outputName}/render.html`, render)
    this.emitFile(`${outputName}/source.html`, Prism.highlight(source, Prism.languages.django, 'django'))

    callback(null, '')
  })
}
