const fs = require('fs-extra')
const getPageData = require('./get-page-data')
const glob = require('fast-glob')
const path = require('path')
const tempPath = require('./temp-path')

function fileEqualsDirectory (file) {
  const extension = path.extname(file)
  return path.basename(file, extension) === path.basename(path.dirname(file))
}

/**
 * Generate components CSS index file
 * @param {string} context Project directory
 */
function css (context) {
  const output = glob.sync('components/**/*.scss', { cwd: path.join(context, 'src') })
    .filter(fileEqualsDirectory)
    .map(file => `@import "src/${file}";`)
    .join('\n')

  fs.ensureDirSync(tempPath(context))
  fs.writeFileSync(tempPath(context, 'styles.scss'), output)
}

/**
 * Generate components docs index file
 * @param {string} context Project directory
 */
function html (context) {
  const output = getPageData(context).files.slice()
    .map(file => `import '@/${file}'`)
    .join('\n')

  fs.ensureDirSync(tempPath(context))
  fs.writeFileSync(tempPath(context, 'html.js'), output)
}

/**
 * Generate components JavaScript index file
 * @param {string} context Project directory
 */
function js (context) {
  const output = glob.sync('components/**/*.js', { cwd: path.join(context, 'src') })
    .filter(fileEqualsDirectory)
    .map(file => `import '@/${file}'`)
    .join('\n')

  fs.ensureDirSync(tempPath(context))
  fs.writeFileSync(tempPath(context, 'scripts.js'), output)
}

module.exports = {
  css,
  html,
  js
}
