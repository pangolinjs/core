const fs = require('fs')
const path = require('path')

const formatName = require('./format-name.js')
const formatPath = require('./format-path.js')
const getComponentConfig = require('./get-component-config.js')
const getComponentDocs = require('./get-component-docs.js')
const isDirectorySync = require('./is-directory-sync.js')

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
      const itemName = item
      const itemPath = formatPath(folder, itemName)

      const children = createTree(context, path.join(folder, itemName))

      // Only add current directory to tree if it has children
      if (children.tree.length) {
        tree.push({
          id: itemPath,
          name: formatName(itemName),
          path: itemPath,
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
      const itemPath = formatPath(folder, itemName)

      const config = getComponentConfig(`${context}/${folder}/${itemName}.json`)
      const docs = getComponentDocs(`${context}/${folder}/${itemName}.md`)

      // Only add current file to tree if it is not hidden
      if (!config.hidden) {
        tree.push({
          id: itemPath,
          name: formatName(itemName),
          path: itemPath,
          config,
          docs
        })
      }

      files.push(formatPath(folder, item))
    })

  return { files, tree }
}

/**
 * Get page date
 * @param {string} context Project directory
 */
module.exports = context => createTree(path.join(context, 'src'), 'components')
