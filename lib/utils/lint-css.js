const chalk = require('chalk')
const { execSync } = require('child_process')
const resolveBin = require('./resolve-bin')

/**
 * Lint CSS/SCSS with stylelint
 * @param {Array<String>} [args=[]] Additional arguments
 * @returns {Boolean} Successfully linted code
 */
function lintCSS (args = []) {
  if (!Array.isArray(args)) {
    throw new TypeError('arguments has to be an array')
  }

  const command = [
    `node ${resolveBin('stylelint')}`,
    '"src/**/*.?(s)css"',
    '--syntax scss',
    `--custom-formatter ${require.resolve('stylelint-codeframe-formatter')}`,
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
