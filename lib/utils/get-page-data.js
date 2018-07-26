const formatName = require('./format-name')
const formatPath = require('./format-path')
const fs = require('fs-extra')
const path = require('path')

/**
 * Recursively walk directory
 * @param {string} context Project directory
 * @param {string} folder Search in this folder
 * @returns {{ files: string[], tree: Object[] }} Flat file array and directory tree
 */
function createTree (context, folder) {
  const tree = []
  const files = []

  let directoryContents = []

  try {
    directoryContents = fs.readdirSync(path.join(context, folder))
  } catch (error) {
    // Throw error if it’s not a permissions error
    if (error.code !== 'EACCESS') {
      throw error
    }
  }

  // Folders first
  directoryContents
    .filter(item => {
      return fs
        .lstatSync(path.join(context, folder, item))
        .isDirectory()
    })
    .forEach(item => {
      const children = createTree(context, path.join(folder, item))

      tree.push({
        name: formatName(item),
        children: children.tree
      })

      files.push(...children.files)
    })

  // Files second
  directoryContents
    .filter(item => !item.startsWith('_') && item.endsWith('.njk'))
    .forEach(item => {
      const filePath = formatPath(folder, item)
      const filePathNoExtension = filePath.slice(0, -4)

      tree.push({
        name: formatName(item),
        path: filePathNoExtension
      })

      files.push(filePath)
    })

  return { files, tree }
}

/**
 * Get page date
 * @param {string} context Project directory
 */
module.exports = context => createTree(path.join(context, 'src'), 'components')
