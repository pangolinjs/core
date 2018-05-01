require('event-source-polyfill')
const hotClient = require('webpack-hot-middleware/client?noInfo=true&overlay=false&reload=true')

hotClient.subscribe(event => {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
