const chalk = require('chalk')
const glob = require('glob')
const path = require('path')

const httpsPost = require('./https-post')
const htmlUtils = require('./utils')
const renderNunjucks = require('./render-nunjucks')

const options = {
  hostname: 'validator.w3.org',
  port: '443',
  path: '/nu/?out=json',
  method: 'POST',
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
    'User-Agent': 'front-end-styleguide'
  }
}

/**
 * Format linter output
 * @param {string} file Linted HTML file
 * @param {Object} message Validator message
 */
function formatMessage (file, message) {
  if (message.type === 'error') {
    console.log(chalk`\n{white.bgRed ERROR} HTML validation error`)
  } else {
    console.log(chalk`\n{black.bgCyan INFO} HTML validation info`)
  }

  let codeHighlight = message.extract.substr(message.hiliteStart, message.hiliteLength)
  let line = message.firstLine ? `${message.firstLine}-${message.lastLine}` : message.lastLine
  let column = message.firstColumn ? `${message.firstColumn}–${message.lastColumn}` : message.lastColumn

  console.log(chalk`
{underline ${file}} [Line ${line}, Column ${column}]
{gray ${message.extract.replace(codeHighlight, chalk.white(codeHighlight)).replace(/^/gm, '| ')}}
${message.message}
`)
}

/**
 * Format connection error
 * @param {string} error Error message
 */
function formatConnectionError (error) {
  console.log(chalk`
{white.bgRed ERROR} Unable to connect to HTML validator
${error}
`)
}

module.exports = cwd => {
  glob('*.njk', { cwd: `${cwd}/src/prototypes` }, (error, files) => {
    if (error) throw error

    let requests = []

    files.forEach(file => {
      let name = path.basename(file, '.njk')

      let inputPath = `prototypes/${name}.njk`

      let request = renderNunjucks(cwd, inputPath)
        .then(html => {
          return new Promise((resolve, reject) => {
            httpsPost(options, html)
              .then(data => resolve(data))
              .catch(error => reject(error))
          })
        }, error => {
          htmlUtils.log.error(error, inputPath)
          process.exit(1)
        })
        .then(data => {
          JSON.parse(data).messages.forEach(message => {
            formatMessage(file, message)
          })

          return JSON.parse(data).messages
        }, error => {
          formatConnectionError(error)
          process.exit(1)
        })

      requests.push(request)
    })

    Promise.all(requests).then(results => {
      let errorCount = results.reduce((sum, result) => {
        let errors = result.filter(message => message.type === 'error')
        return sum + errors.length
      }, 0)

      if (errorCount > 0) {
        console.error(`Failed with ${errorCount} ${errorCount === 1 ? 'error' : 'errors'}`)
        process.exit(1)
      }
    }).catch(error => {
      console.error(error)
    })
  })
}
