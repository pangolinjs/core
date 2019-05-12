const chalk = require('chalk')
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
    const userConfig = require(path.join(context, USER_CONFIG_FILENAME))
    merge(config, userConfig)
  } catch (error) {
    const { requireStack } = error

    // Log error and kill process if it occured inside the user config,
    // don’t quit if the user config is missing.
    if (!requireStack || requireStack[0].endsWith(USER_CONFIG_FILENAME)) {
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
