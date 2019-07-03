/**
 * Escape HTML
 * @see {@link https://stackoverflow.com/a/4835406/9208523}
 * @param {String} html Raw HTML
 * @returns {String} Escaped HTML
 */
module.exports = function (html) {
  const replacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }

  return html.replace(/[&<>"']/g, match => replacements[match])
}
