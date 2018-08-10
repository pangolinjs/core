/**
 * Format file name
 * @param {string} name File name
 * @returns {string} Formatted file name
 */
module.exports = function (name) {
  if (!name) {
    throw new Error('Paramater ‘name’ is necessary.')
  }

  if (typeof name !== 'string') {
    throw new Error('Parameter ‘name’ must be a string.')
  }

  return name
    .split('--')
    .map(part => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}
