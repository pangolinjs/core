/**
 * Generate output filename
 * @param {Object} options Options
 * @param {'js'|'css'} options.type File type
 * @param {boolean|'imported'|'all'} options.hash Hash file names
 * @returns {string} File name
 */
export default function ({ type, hash }) {
  return `${type}/${hash === 'all' ? '[contenthash:8]' : '[name]'}.${type}`
}
