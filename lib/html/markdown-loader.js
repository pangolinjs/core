const showdown = require('showdown')
const showdownContainer = require('./showdown-container')
const showdownHighlight = require('./showdown-highlight')

const converter = new showdown.Converter({
  extensions: [
    showdownContainer,
    showdownHighlight
  ],
  metadata: true,
  prefixHeaderId: 'pangolin-',
  rawPrefixHeaderId: true,
  strikethrough: true,
  tables: true
})

module.exports = function (src) {
  // Convert Markdown to HTML and extract frontmatter
  const content = converter.makeHtml(src)
  const meta = converter.getMetadata()

  // Pass content and frontmatter to next loader
  this.callback(null, content, null, meta)
}
