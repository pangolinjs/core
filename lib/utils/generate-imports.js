const fs = require('fs-extra')
const getPageData = require('./get-page-data')
const glob = require('fast-glob')
const path = require('path')
const store = require('./store')
const tempPath = require('./temp-path')

/**
 * Generate components CSS index file
 * @param {string} context Project directory
 */
function css (context) {
  const cwd = path.join(context, 'src')

  const output = glob
    .sync('components/**/[^_]*.scss', { cwd })
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
  const { files, tree } = getPageData(context)

  store.components = tree

  const output = files
    .slice()
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
  const cwd = path.join(context, 'src')

  const output = glob
    .sync('components/**/[^_]*.js', { cwd })
    .map(file => `import '@/${file}'`)
    .join('\n')

  fs.ensureDirSync(tempPath(context))
  fs.writeFileSync(tempPath(context, 'scripts.js'), output)
}

module.exports = { css, html, js }
