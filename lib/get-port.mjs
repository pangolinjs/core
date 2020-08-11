import { createServer } from 'net'

/**
 * Search for available port
 * Source: {@link https://gist.github.com/mikeal/1840641}
 * @param {number} port Desired port
 * @param {Function} callback Called with available port
 */
function getPort (port, callback) {
  const server = createServer()

  server.on('error', () => {
    getPort(++port, callback)
  })

  // Explicitly listen on 0.0.0.0 to detect ports used by Docker
  // See: https://github.com/nodejs/node/issues/14034
  server.listen(port, '0.0.0.0', () => {
    server.once('close', () => {
      callback(port)
    })
    server.close()
  })
}

/**
 * Search for an available port
 * @param {number} port Desired port
 * @returns {Promise<number>} Available port
 */
export default function (port) {
  return new Promise(resolve => {
    getPort(port, resolve)
  })
}
