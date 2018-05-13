const portfinder = require('portfinder')

/**
 * Search for an available port
 * @param {number} [port=8080] Desired port
 * @returns {Promise<number>} Available port
 */
module.exports = function (port = 8080) {
  portfinder.basePort = port
  return portfinder.getPortPromise()
}
