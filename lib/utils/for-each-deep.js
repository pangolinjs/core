/**
 * Loop through nested array of objects
 * @param {Array<Object>} array Tree of objects
 * @param {string} key Key with children
 * @param {Function} callback Callback function
 */
function forEachDeep (array, key, callback) {
  array[key].forEach(item => {
    callback(item)

    if (item[key]) {
      forEachDeep(item, key, callback)
    }
  })
}

module.exports = forEachDeep
