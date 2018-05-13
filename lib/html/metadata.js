const fs = require('fs-extra')
const glob = require('fast-glob')
const grayMatter = require('gray-matter')
const path = require('path')
const typeFromPath = require('./type-from-path')

const state = {
  components: {},
  prototypes: {}
}

/**
 * Update or add file metadata
 * @param {string} file Absolute file path
 * @param {Object} [frontmatter] Optional frontmatter
 */
function updateFile (file, frontmatter) {
  const type = typeFromPath(file)

  if (!frontmatter) {
    const src = fs.readFileSync(file)
    frontmatter = grayMatter(src).data
  }

  let slug

  if (type === 'components') {
    slug = path.basename(path.dirname(file))
  }

  if (type === 'prototypes') {
    slug = path.basename(file, '.njk')
  }

  state[type][file] = {
    ...frontmatter,
    slug,
    type
  }
}

/**
 * Remove file from state
 * @param {string} file Absolute file path
 */
function deleteFile (file) {
  delete state[typeFromPath(file)][file]
}

/**
 * Collect metadata for all components and prototypes
 * @param {string} context Project directory
 */
function startup (context) {
  const components = glob.sync(path.join(context, 'src/components/**/docs.md'))
  const prototypes = glob.sync(path.join(context, 'src/prototypes/*.njk'))

  components.forEach(updateFile)
  prototypes.forEach(updateFile)
}

module.exports = {
  state,
  startup,
  updateFile,
  deleteFile
}
