const chalk = require('chalk')

/**
 * Format Nunjucks success
 * @param {string} file File path
 */
module.exports = (file) => {
  console.log(chalk`
{white.bgBlue  INFO } Nunjucks rendering successful
${file}`)
}
