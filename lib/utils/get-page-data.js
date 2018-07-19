const fs = require('fs-extra')
const path = require('path')

function upperFirst (str) {
  return str[0].toUpperCase() + str.slice(1)
}

module.exports = function (context) {
  const files = []
  const tree = {
    type: 'category',
    name: 'Components',
    slug: 'components',
    children: {}
  }

  function walkDirectory (parent, parentPath, children) {
    const childFiles = children
      .filter(child => child.endsWith('.njk'))
      .map(child => path.basename(child, '.njk'))

    // Check if current level has children
    // If not convert to page and remove `children` key
    if (childFiles.length === 1 && parent.slug === path.basename(childFiles[0], '.njk')) {
      parent.type = 'page'
      parent.path = `${parentPath}`
      delete parent.children

      files.push(`components/${parent.path}/${parent.slug}.njk`)
      return
    }

    const childPath = child => path.join(context, 'src/components', parentPath, child)

    const childFolders = children
      .filter(child => fs.lstatSync(childPath(child)).isDirectory())

    childFolders.forEach(child => {
      const newChildren = fs.readdirSync(childPath(child))

      if (newChildren.length && !parent.children[child]) {
        parent.children[child] = {
          type: 'category',
          slug: child,
          name: upperFirst(child),
          children: {}
        }
      }

      const newParentPath = parentPath ? `${parentPath}/${child}` : child
      walkDirectory(parent.children[child], newParentPath, newChildren)
    })

    // If category name and file name are equal,
    // the file overwrites the category
    childFiles.forEach(child => {
      let name = upperFirst(child)

      // Generate pretty name for component variants
      if (child.includes('--')) {
        name = upperFirst(child.split('--')[1])
      }

      parent.children[child] = {
        type: 'page',
        slug: child,
        path: `${parentPath}`,
        name
      }

      files.push('components/' + (parentPath ? `${parentPath}/${child}` : child) + '.njk')
    })
  }

  const children = fs.readdirSync(path.join(context, 'src/components'))
  walkDirectory(tree, '', children)

  // console.log(JSON.stringify(tree, null, 2))

  return { files, tree }
}
