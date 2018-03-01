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
          return httpsPost(options, html)
        }, error => {
          htmlUtils.log.error(error, inputPath)
          process.exit(1)
        })
        .then(data => {
          // JSON.parse(data).messages.forEach(message => {
          //   htmlUtils.log.lint(message, file)
          // })

          let result = JSON.parse(data)
          result.path = inputPath

          return result
        }, error => {
          formatConnectionError(error)
          process.exit(1)
        })

      requests.push(request)
    })

    Promise.all(requests).then(results => {
      let messages = []
        .concat(...results.map(item => item.messages))

      let errors = messages.filter(item => item.type === 'error')

      let messageType = errors.length
        ? chalk`{white.bgRed  ERROR }`
        : chalk`{black.bgCyan  INFO }`

      if (messages.length) {
        console.log(chalk`\n${messageType} HTML validation\n`)
        htmlUtils.log.lint(results)
      }

      if (errors.length) {
        console.error(`  HTML validation failed with ${errors.length} ${errors.length === 1 ? 'error' : 'errors'}\n`)
        process.exit(1)
      }
    }).catch(error => {
      console.error(error)
    })
  })
}
