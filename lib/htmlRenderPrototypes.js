const gutil = require('gulp-util')
const nunjucks = require('nunjucks')
const path = require('path')
const through = require('through2')

const htmlMetaPath = require('./htmlMetaPath')
const htmlNavigation = require('./htmlNavigation')
const log = require('./log')

const CWD = gutil.env.dir
const MODULE_DIR = path.resolve(__dirname, '..')

function renderHTML (file, config, paths, brandingObject) {
  return new Promise((resolve, reject) => {
    let nunjucksEnv = new nunjucks.Environment(
      new nunjucks.FileSystemLoader([CWD, MODULE_DIR])
    )

    nunjucksEnv.addGlobal('meta', {
      env: config.env,
      nav: htmlNavigation(paths, file.relative, brandingObject),
      path: htmlMetaPath(paths, file.relative),
      version: require(`${CWD}/package.json`).version
    })

    nunjucksEnv.addGlobal('sgNav', 'docs/nav.njk')

    nunjucksEnv.render(file.path, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

function htmlRenderPrototypes (config, paths, brandingObject) {
  return through.obj((file, enc, callback) => {
    if (file.isNull()) {
      return callback(null, file)
    }

    renderHTML(file, config, paths, brandingObject)
      .then(result => {
        file.contents = Buffer.from(result)
        file.path = file.path.replace('.njk', '.html')

        callback(null, file)
      })
      .catch(error => {
        log.nunjucksError(error)
        callback()
      })
  })
}

module.exports = htmlRenderPrototypes
