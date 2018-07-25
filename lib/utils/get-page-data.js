const fs = require('fs-extra')
const path = require('path')

/**
 * Format file name
 * @param {string} name File name
 * @returns {string} Formatted file name
 */
function formatName (name) {
  return path.basename(name, '.njk')
    .split('--')
    .map(part => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}

function formatPath (...segments) {
  return path.join(...segments)
    .split(path.sep)
    .join('/')
}

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
      const filePathDocs = path.join(context, filePathNoExtension + '.md')

      let docs

      try {
        docs = fs.readFileSync(filePathDocs).toString()
      } catch (error) {
        // Ignore missing docs
      }

      tree.push({
        name: formatName(item),
        path: filePathNoExtension,
        docs
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
