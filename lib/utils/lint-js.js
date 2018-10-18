const chalk = require('chalk')
const { execSync } = require('child_process')

/**
 * Lint JavaScript with ESLint
 * @param {Array<String>} [args=[]] Additional arguments
 * @returns {Boolean} Successfully linted code
 */
function lintJS (args = []) {
  if (!Array.isArray(args)) {
    throw new TypeError('arguments has to be an array')
  }

  const command = [
    'node_modules/.bin/eslint',
    '--format codeframe',
    '"src/**/*.js"',
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

module.exports = lintJS
