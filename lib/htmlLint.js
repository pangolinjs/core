const gutil = require('gulp-util')
const through = require('through2')

const httpsPost = require('./httpsPost')
const log = require('./log')

let options = {
  failAfterError: true
}

let requestOptions = {
  hostname: 'validator.w3.org',
  port: '443',
  path: '/nu/?out=json',
  method: 'POST',
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
    'User-Agent': 'front-end-styleguide'
  }
}

module.exports = function (userOptions) {
  Object.assign(options, userOptions)

  let requests = []

  function onFile (file, enc, callback) {
    if (file.isNull()) {
      return callback(null, file)
    }

    let request = httpsPost(requestOptions, file.contents.toString())
      .then(data => {
        let messageTypes = []

        JSON.parse(data).messages.forEach(message => {
          messageTypes.push(message.type)
          log.htmlLintError(`${file.relative}`, message)
        })

        callback(null, file)
        return messageTypes
      })
      .catch(error => log.htmlLintConnection(error))

    requests.push(request)
  }

  function onStreamEnd (callback) {
    Promise.all(requests).then(results => {
      let errorCount = results.reduce((sum, result) => {
        let errors = result.filter(value => value === 'error')
        return sum + errors.length
      }, 0)

      if (options.failAfterError && errorCount > 0) {
        let errorMessage = `Failed with ${errorCount} ${errorCount === 1 ? 'error' : 'errors'}`
        this.emit('error', new gutil.PluginError('HTML Lint', errorMessage))
      }

      callback()
    })
  }

  return through.obj(onFile, onStreamEnd)
}
