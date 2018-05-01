const commands = {
  'dev': './commands/dev',
  'build': './commands/build',
  'lint': './commands/lint'
}

module.exports = {
  run (command, args) {
    require(commands[command])(args)
  }
}
