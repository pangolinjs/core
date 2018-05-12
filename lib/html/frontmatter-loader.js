const grayMatter = require('gray-matter')
const metadata = require('./metadata')
const normalizeResourcePath = require('./normalize-resourcepath')

/**
 * Extract frontmatter into metadata store
 * @param {string} src File content with frontmatter
 * @returns {string} File content without frontmatter
 */
module.exports = function (src) {
  const resourcePath = normalizeResourcePath(this.resourcePath)
  const { content, data: frontmatter } = grayMatter(src)

  metadata.updateFile(resourcePath, frontmatter)

  return content
}
