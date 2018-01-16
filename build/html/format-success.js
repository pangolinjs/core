const chalk = require('chalk')

/**
 * Format Nunjucks success
 * @param {string} file File path
 */
module.exports = (file) => {
  console.log(chalk`
{black.bgBlue  INFO } Template render success
${file}`)
}
