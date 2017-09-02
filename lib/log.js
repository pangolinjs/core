const chalk = require('chalk')

exports.defaultPath = () => {
  console.log(chalk`
{black.bgCyan INFO} Using default paths
`)
}

exports.defaultConfiguration = () => {
  console.log(chalk`
{black.bgCyan INFO} Using default configuration
`)
}

exports.defaultBranding = () => {
  console.log(chalk`
{black.bgCyan INFO} Using default branding
`)
}

exports.nunjucksError = error => {
  console.log(chalk`
{white.bgRed ERROR} HTML rendering failed
${error.message}
`)
}

exports.htmlLintError = (file, message) => {
  if (message.type === 'error') {
    console.log(chalk`\n{white.bgRed ERROR} HTML validation error`)
  } else {
    console.log(chalk`\n{black.bgCyan INFO} HTML validation info`)
  }

  let codeHighlight = message.extract.substr(message.hiliteStart, message.hiliteLength)
  let codeLine = message.firstLine ? `${message.firstLine}-${message.lastLine}` : message.lastLine

  console.log(chalk`
{underline ${file}} [Line ${codeLine}, Column ${message.firstColumn}–${message.lastColumn}]

{gray ${message.extract.replace(codeHighlight, chalk.white(codeHighlight)).replace(/^/gm, '| ')}}

${message.message}
`)
}

exports.htmlLintConnection = error => {
  console.log(chalk`
{white.bgRed ERROR} Unable to connect to HTML validator

${error}
`)
}
