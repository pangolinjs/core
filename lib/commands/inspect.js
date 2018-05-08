const chalk = require('chalk')
const inspectConfig = require('../config/inspect')
const javascriptStringify = require('javascript-stringify')

module.exports = function (args) {
  if (!args._[1]) {
    console.error(chalk`
  Please specify the task to inspect:

  {cyan pangolin inspect} {bold dev}
  {cyan pangolin inspect} {bold build} [--dev|--proto]
    `)

    process.exit(1)
  }

  const config = inspectConfig(process.cwd(), args._[1], args)

  /**
   * Source:
   * https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/inspect.js
   */
  const pluginRegExp = /(?:function|class) (\w+Plugin)/
  const output = javascriptStringify(config, (value, indent, stringify) => {
    if (!args.verbose) {
      if (typeof value === 'function' && value.toString().length > 100) {
        return 'function () { /* omitted long function */ }'
      }

      if (value && typeof value.constructor === 'function') {
        const match = value.constructor.toString().match(pluginRegExp)

        if (match) {
          return `/* ${match[1]} */\n${stringify(value)}`
        }
      }
    }

    return stringify(value)
  }, 2)

  console.log(output)
}
