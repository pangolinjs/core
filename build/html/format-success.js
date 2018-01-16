const chalk = require('chalk')

/**
 * Format Nunjucks success
 * @param {string} file File path
 */
module.exports = (file) => {
  console.log('\x1Bc')
  console.log(chalk`{black.bgGreen  DONE } Template render success

{black.bgBlue  FILE } ${file}`)
}
