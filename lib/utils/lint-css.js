const chalk = require('chalk')
const { execSync } = require('child_process')

const resolveBin = require('./resolve-bin')

/**
 * Lint CSS/SCSS with stylelint
 * @param {Array<String>} [args=[]] Additional arguments
 * @returns {Boolean} Successfully linted code
 */
function lintCSS (args = []) {
  const command = [
    `node ${resolveBin('stylelint')}`,
    '"src/**/*.?(s)css"',
    ...args
  ].join(' ')

  console.log(chalk`\nCommand:\n{green ${command}}\n`)

  try {
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    return false
  }

  return true
}

module.exports = lintCSS
