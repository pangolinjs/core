const merge = require('lodash.merge')
const path = require('path')
const store = require('../store')

/**
 * Get project configuration
 * @param {string} context Project directory
 * @returns {Object} Configuration
 */
module.exports = (context) => {
  // 0. Immediately return stored config
  if (store.state.config) {
    return store.state.config
  }

  // 1. Set Default config
  const config = {
    devServer: {
      host: '0.0.0.0',
      port: 8080
    },
    nunjucks: {},
    project: {
      name: 'Pangolin',
      base: '/'
    },
    fileNameHash: true
  }

  // 2. Try to load user config file
  try {
    const userConfig = require(path.join(context, 'pangolin.config.js'))
    merge(config, userConfig)
  } catch (_) {}

  // 3. Load environment variables
  merge(config, {
    devServer: {
      host: process.env.PANGOLIN_HOST,
      port: process.env.PANGOLIN_PORT && parseInt(process.env.PANGOLIN_PORT)
    },
    project: {
      base: process.env.PANGOLIN_BASE
    }
  })

  return config
}
