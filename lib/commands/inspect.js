const chalk = require('chalk')
const inspectConfig = require('../config/inspect')
const prettyJSON = require('prettyjson')

module.exports = function (args) {
  if (!args._[1]) {
    console.error(chalk`
  Please specify the task to inspect:

  {blueBright pangolin inspect} {bold dev}
  {blueBright pangolin inspect} {bold build} [--dev|--proto]
    `)

    process.exit(1)
  }

  const config = inspectConfig(process.cwd(), args._[1], args)
  const output = prettyJSON.render(config)

  console.log(output)
}
