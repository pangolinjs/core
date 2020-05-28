const chalk = require('chalk')
const fs = require('fs')
const merge = require('lodash.merge')
const path = require('path')

const store = require('../store')

const USER_CONFIG_FILENAME = 'pangolin.config.js'

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
      port: 8080,
      webSocketPath: '/socket'
    },
    nunjucks: {},
    project: {
      id: require(`${context}/package.json`).name,
      name: 'Pangolin.js',
      base: '/',
      branding: {
        color: '#ff721f',
        favicon: 'favicon.ico'
      }
    },
    fileNameHash: 'all',
    manifest: false,
    transpileDependencies: []
  }

  // 2. Try to load user config file
  const userConfigPath = path.join(context, USER_CONFIG_FILENAME)

  if (fs.existsSync(userConfigPath)) {
    try {
      const userConfig = require(userConfigPath)
      merge(config, userConfig)
    } catch (error) {
      console.error(chalk`{red Error in {yellow ${USER_CONFIG_FILENAME}}:}\n`)
      console.error(error, '\n')
      process.exit(1)
    }
  }

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
