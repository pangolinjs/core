/**
 * Generate output filename
 * @param {Object} options Options
 * @param {'js'|'css'} options.type File type
 * @returns {string} File name
 */
export default function ({ type }) {
  return `${type}/[name].${type}`
}
