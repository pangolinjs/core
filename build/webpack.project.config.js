const path = require('path')

module.exports = context => {
  const configPath = path.join(context, 'config/webpack.js')

  try {
    const config = require(configPath)(context)[process.env.FESG_ENV]
    return config || {}
  } catch (error) {
    return {}
  }
}
