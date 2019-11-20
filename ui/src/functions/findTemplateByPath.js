/**
 * Find template by path
 * @param {Array} list Template list
 * @param {string} path Current path
 */
export default function (list, path) {
  return list.find(item => item.path === path)
}
