/**
 * Generate file-loader options
 * @param {Object} options Options
 * @param {'img'|'video'|'audio'|'font'} options.type File type
 * @param {boolean|'imported'|'all'} [options.hash] Hash file names
 * @returns {string} file-loader options
 */
export default function ({ type, hash }) {
  return `${type}/${hash ? '[contenthash:8]' : '[name]'}[ext]`
}
