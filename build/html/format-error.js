const chalk = require('chalk')

/**
 * Format nunjucks error
 * @param {Object} error Nunjucks error message
 */
module.exports = (error) => {
  console.error(chalk`
{white.bgRed  ERROR } Nunjucks rendering failed
${error.message}
`)
}
