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
  /**
   * Format rendering success
   * @param {string} file File path
   */
  success (file) {
    console.log(chalk`{black.bgGreen  DONE } Template render success`)
    console.log()
    console.log(chalk`{black.bgBlue  FILE } ${file}`)
  },

  /**
   * Format rendering error
   * @param {Object} error Error message
   * @param {string} file File path
   */
  error (error, file) {
    console.error(chalk`{black.bgRed  ERROR } ${error.name}`)
    console.error()
    console.error(chalk`{black.bgBlue  FILE } ${file}`)
    console.error()
    console.error(chalk`${error.message}`)
  },

  /**
   * Format linter output
   * @param {array} files Files array with messages
   */
  lint (files) {
    files.forEach(file => {
      if (file.messages.length) {
        console.log(chalk`  {underline ${file.path}}\n`)
      }

      file.messages.forEach(message => {
        let messageType = message.type === 'error'
          ? chalk`{white.bgRed  error }`
          : chalk`{black.bgCyan  info }`

        let codeHighlight = message.extract.substr(message.hiliteStart, message.hiliteLength)

        let line = message.firstLine
          ? `${message.firstLine}-${message.lastLine}`
          : message.lastLine

        let column = message.firstColumn
          ? `${message.firstColumn}–${message.lastColumn}`
          : message.lastColumn

        console.log(chalk`    ${messageType} [Line ${line}, Column ${column}] ${message.message}\n`)
        console.log(chalk`{gray ${message.extract.replace(codeHighlight, chalk.white(codeHighlight)).replace(/^/gm, '    | ')}}\n`)
      })
    })
  }
}
