function componentTitle (fileName) {
  return fileName
    .replace('components/', '')
    .replace(/[\s-_.]/g, ' ')
    .replace(/^.|\s.|\/./g, word => word.toUpperCase())
}

module.exports = componentTitle
