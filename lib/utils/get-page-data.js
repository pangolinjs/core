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
    .filter(item => item.endsWith('.njk'))
    .forEach(item => {
      const basename = path.basename(item, '.njk')
      const filePath = formatPath(folder, item)
      const configPath = path.join(context, folder, basename + '.json')

      let config

      try {
        config = JSON.parse(fs.readFileSync(configPath))
      } catch (error) {
        config = {}
      }

      // Don’t add current component to tree if it’s hidden
      if (config.hidden) {
        return
      }

      tree.push({
        name: formatName(basename),
        path: filePath.slice(0, -4),
        config
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
