const fs = require('fs-extra')
const path = require('path')

const formatName = require('./format-name.js')
const formatPath = require('./format-path.js')
const isDirectorySync = require('./is-directory-sync.js')
const readFileSync = require('./read-file-sync.js')

/**
 * Recursively walk directory
 * @param {string} context Project directory
 * @param {string} folder Search in this folder
 * @returns {{ files: string[], tree: Object[] }} Flat file array and directory tree
 */
function createTree (context, folder) {
  const tree = []
  const files = []
  const directoryContents = []

  try {
    directoryContents.push(...fs.readdirSync(path.join(context, folder)))
  } catch (error) {
    // Throw error if it’s not a permissions error
    if (error.code !== 'EACCESS') {
      throw error
    }
  }

  // Folders first
  directoryContents
    .filter(item => isDirectorySync(path.join(context, folder, item)))
    .forEach(item => {
      const children = createTree(context, path.join(folder, item))

      // Don’t add current directory to tree if it has no children
      if (children.tree.length) {
        tree.push({
          name: formatName(item),
          children: children.tree
        })
      }

      files.push(...children.files)
    })

  // Files second
  directoryContents
    .filter(item => path.extname(item) === '.njk')
    .forEach(item => {
      const itemName = path.basename(item, path.extname(item))

      const configPath = path.join(context, folder, `${itemName}.json`)
      const config = JSON.parse(readFileSync(configPath) || '{}')

      tree.push({
        name: formatName(itemName),
        hidden: config.hidden,
        path: formatPath(folder, `${itemName}.html`),
        config
      })

      files.push(formatPath(folder, item))
    })

  return { files, tree }
}

/**
 * Get page date
 * @param {string} context Project directory
 */
module.exports = context => createTree(path.join(context, 'src'), 'components')
