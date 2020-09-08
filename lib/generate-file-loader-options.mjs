/**
 * Generate file-loader options
 * @param {Object} options Options
 * @param {string} options.type File type
 * @param {boolean|'imported'|'all'} options.hash Hash file names
 * @returns {{name:string}} file-loader options
 */
export default function ({ type, hash }) {
  const config = {
    name: `${type}/${hash ? '[contenthash:8]' : '[name]'}.[ext]`
  }

  if (process.env.NODE_ENV === 'production') {
    config.publicPath = url => `../${url}`
  }

  return config
}
