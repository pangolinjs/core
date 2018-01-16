const chalk = require('chalk')

/**
 * Format nunjucks error
 * @param {Object} error Nunjucks error message
 */
module.exports = (error) => {
  console.error(chalk`
{black.bgRed  ERROR } ${error.name}
${error.message}`)
}
