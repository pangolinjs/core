const grayMatter = require('gray-matter')
const metadata = require('./metadata')
const normalizePath = require('../utils/normalize-path')

/**
 * Extract frontmatter into metadata store
 * @param {string} src File content with frontmatter
 * @returns {string} File content without frontmatter
 */
module.exports = function (src) {
  const resourcePath = normalizePath(this.resourcePath)
  const { content, data: frontmatter } = grayMatter(src)

  metadata.updateFile(resourcePath, frontmatter)

  return content
}
