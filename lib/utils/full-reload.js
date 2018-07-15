const WebSocket = require('ws')

/**
 * Broadcast a full reload via WebSocket
 * @param {string} url WebSocket URL
 */
module.exports = function (url) {
  const webSocket = new WebSocket(url)
  const data = {
    type: 'broadcast',
    data: { type: 'window-reload' }
  }

  webSocket.on('open', () => {
    webSocket.send(JSON.stringify(data))
  })
}
