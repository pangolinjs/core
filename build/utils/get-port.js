const getConfig = require('./get-config')
const portfinder = require('portfinder')

/**
 * Search for an available port
 * @param {string} context Project directory
 * @return {Promise} node-portfinder result
 */
module.exports = context => {
  const config = getConfig(context, 'webpack.js')
  const devServerConfig = config.devServer || {}

  portfinder.basePort = process.env.PORT || devServerConfig.port || 8080

  return portfinder.getPortPromise()
}
