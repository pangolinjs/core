/**
 * Find component by path
 * @param {Array} list Component list
 * @param {string} path Current path
 */
export default function findComponentByPath (list, path) {
  for (const item of list) {
    if (item.path === path) {
      return item
    }

    const child = findComponentByPath(item.children || [], path)

    if (child) {
      return child
    }
  }
}
