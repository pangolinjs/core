/**
 * Generate file-loader options
 * @param {Object} options Options
 * @param {string} options.type File type
 */
export default function ({ type }) {
  return {
    name: `${type}/[name].[ext]`
  }
}
