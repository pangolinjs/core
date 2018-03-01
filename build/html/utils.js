const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

exports.clearConsole = function () {
  const blank = '\n'.repeat(process.stdout.rows)
  console.log(blank)
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
}

exports.loadTemplate = function (name) {
  let filePath = path.resolve(__dirname, `../../docs/templates/${name}.njk`)
  let fileContents = fs.readFileSync(filePath)

  return fileContents.toString()
}

exports.log = {
  success (file) {
    console.log(chalk`{black.bgGreen  DONE } Template render success`)
    console.log()
    console.log(chalk`{black.bgBlue  FILE } ${file}`)
  },

  error (error, file) {
    console.error(chalk`{black.bgRed  ERROR } ${error.name}`)
    console.error()
    console.error(chalk`{black.bgBlue  FILE } ${file}`)
    console.error()
    console.error(chalk`${error.message}`)
  }
}
