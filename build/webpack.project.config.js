const path = require('path')

module.exports = context => {
  const configPath = path.join(context, 'config/webpack.js')

  try {
    const config = require(configPath)

    if (typeof config.configure === 'function') {
      return config.configure(context)
    }

    if (typeof config.configure === 'object') {
      return config.configure
    }

    return {}
  } catch (error) {
    return {}
  }
}
