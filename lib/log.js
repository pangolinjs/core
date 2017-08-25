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
