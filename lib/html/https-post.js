const https = require('https')

/**
 * Make HTTPS request with post data
 * @param {Object} options HTTPS options
 * @param {string} postData Include post data
 */
module.exports = function post (options, postData) {
  return new Promise((resolve, reject) => {
    const request = https.request(options, response => {
      response.setEncoding('utf8')

      if (response.statusCode !== 200) {
        reject(response.statusMessage)
      }

      response.on('data', data => resolve(data))
    })

    request.write(postData)
    request.on('error', error => reject(error))
    request.end()
  })
}
