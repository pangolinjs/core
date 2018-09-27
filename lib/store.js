const getConfig = require('./utils/get-config')

const state = {
  components: null,
  config: null,
  cwd: null,
  websocket: {
    port: null
  }
}

exports.setup = function (context) {
  state.cwd = context
  state.config = getConfig(context)
}

exports.state = state
