/**
 * Format file name
 * @param {string} name File name
 * @returns {string} Formatted file name
 */
module.exports = function (name) {
  return name
    .split('--')
    .map(part => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}
