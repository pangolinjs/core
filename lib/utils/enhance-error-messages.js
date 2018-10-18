const program = require('commander')
const chalk = require('chalk')

/**
 * Enhance Commander.js error message with more useful help
 * Inspired by Vue CLI
 * @see {@link https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/lib/util/enhanceErrorMessages.js | Source on GitHub}
 * @param {string} method Commander.js method name
 * @param {Function} log Error message callback (returns a string)
 */
function enhanceErrorMessages (method, log) {
  program.Command.prototype[method] = function (argument) {
    if (method === 'unknownOption' && this._allowUnknownOption) {
      return
    }

    this.outputHelp()
    console.log(chalk`\n{red ${log(argument)}}`)
    process.exit(1)
  }
}

module.exports = enhanceErrorMessages
