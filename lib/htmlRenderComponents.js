const glob = require('glob')
const gutil = require('gulp-util')
const nunjucks = require('nunjucks')
const path = require('path')
const through = require('through2')

const htmlComponentList = require('./htmlComponentList')
const htmlComponentTitle = require('./htmlComponentTitle')
const htmlMetaPath = require('./htmlMetaPath')
const htmlNavigation = require('./htmlNavigation')
const log = require('./log')

const CWD = gutil.env.dir
const MODULE_DIR = path.resolve(__dirname, '..')

module.exports = function (config, paths, brandingObject) {
  function renderHTML (fileName, sections) {
    return new Promise((resolve, reject) => {
      let nunjucksEnv = new nunjucks.Environment(
        new nunjucks.FileSystemLoader([CWD, MODULE_DIR])
      )

      const title = htmlComponentTitle(fileName)

      nunjucksEnv.addGlobal('meta', {
        env: config.env,
        title,
        nav: htmlNavigation(paths, fileName, brandingObject),
        path: htmlMetaPath(paths, fileName, brandingObject),
        version: require(`${CWD}/package.json`).version
      })
      nunjucksEnv.addGlobal('sections', sections) // Deprecated
      nunjucksEnv.addGlobal('sgSections', sections)
      nunjucksEnv.addGlobal('sgHeader', 'docs/header.njk')
      nunjucksEnv.addGlobal('sgSection', 'docs/section.njk')
      nunjucksEnv.addGlobal('sgNav', 'docs/nav.njk')
      nunjucksEnv.addGlobal('sgFooter', 'docs/footer.njk')

      nunjucksEnv.render('src/layouts/components.njk', (error, result) => {
        if (error) {
          // Log the error here because somehow the Promise rejection
          // doesn't catch errors from Nunjuck includes
          log.nunjucksError(error)
        } else {
          resolve(result)
        }
      })
    })
  }

  let renderPromises = []

  function onFile (file, enc, callback) {
    callback()
  }

  function onStreamEnd (callback) {
    htmlComponentList(paths).forEach(fileName => {
      const sections = glob.sync(`src/${fileName}/*.guide.njk`, { CWD })

      if (sections.length > 0) {
        let render = renderHTML(fileName, sections)
          .then(result => {
            this.push(new gutil.File({
              cwd: '',
              base: '',
              path: fileName.replace('components/', '') + '.html',
              contents: Buffer.from(result)
            }))
          })

        renderPromises.push(render)
      }
    })

    Promise.all(renderPromises).then(() => {
      callback()
    })
  }

  return through.obj(onFile, onStreamEnd)
}
