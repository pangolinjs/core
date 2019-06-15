const getConfig = require('./utils/get-config')

const state = {
  components: null,
  config: null,
  cwd: null,
  modern: false
}

exports.setup = function (context) {
  state.cwd = context
  state.config = getConfig(context)
}

exports.state = state
