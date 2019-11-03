const program = require('commander')
const chalk = require('chalk')

/**
 * Enhance Commander.js error message with more useful help
 * Inspired by Vue CLI
 * @see {@link https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/lib/util/enhanceErrorMessages.js | Source on GitHub}
 * @param {string} methodName Commander.js method name
 * @param {Function} log Error message callback (returns a string)
 */
function enhanceErrorMessages (methodName, log) {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return
    }

    this.outputHelp()
    console.log(chalk`\n{red ${log(...args)}}`)
    process.exit(1)
  }
}

module.exports = enhanceErrorMessages
