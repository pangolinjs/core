#!/usr/bin/env node

const chalk = require('chalk')
const program = require('commander')

const enhanceErrorMessages = require('../lib/utils/enhance-error-messages')

program
  .version(require('../package.json').version)
  .usage('<command> [options]')

program
  .command('dev')
  .description('Start development server')
  .option('--open [browser]', 'Open in default or specific browser')
  .option('--host <hostname>', 'Override the default 0.0.0.0 hostname')
  .option('--port <port>', 'Override the default 8080 port')
  .action(env => {
    require('../lib/commands/dev')({
      open: env.open,
      host: env.host,
      port: env.port
    })
  })

program
  .command('build')
  .description('Build production files')
  .option('--dev', 'Build files for static file server')
  .option('--modern', 'Build additional modern bundle')
  .option('--report', 'Generate report with webpack-bundle-analyzer')
  .action(env => {
    require('../lib/commands/build')({
      dev: env.dev,
      modern: env.modern,
      report: env.report
    })
  })

program
  .command('lint <language>')
  .usage('css|js [options]')
  .description('Lint CSS or JavaScript files')
  .allowUnknownOption()
  .action((language, env) => {
    if (!['css', 'js'].includes(language)) {
      return env.help()
    }

    require('../lib/commands/lint')({
      language,
      arguments: env.parent.rawArgs.slice(4)
    })
  })

program
  .command('inspect <task>')
  .usage('dev|build [options]')
  .description('Generate and output webpack config')
  .option('--dev', 'Switch to dev mode for build task')
  .option('--compact', 'Less line breaks in output')
  .action((task, env) => {
    require('../lib/commands/inspect')({
      task,
      dev: env.dev,
      compact: env.compact
    })
  })

program
  .arguments('*')
  .action(cmd => {
    program.outputHelp()
    console.log(chalk`\n{red Unknown command {yellow <${cmd.args}>}.}`)
  })

enhanceErrorMessages('missingArgument', argument => {
  return chalk`Missing required argument {yellow <${argument}>}.`
})

enhanceErrorMessages('unknownOption', option => {
  return chalk`Unknown option {yellow ${option}}.`
})

program.parse(process.argv)

if (program.rawArgs.length < 3) {
  program.help()
}
