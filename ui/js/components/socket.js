/* global webSocketPath */

let webSocket
let timeout
let isReconnect = false

/**
 * WebSocket with auto-reconnect
 */
function connect () {
  if (!webSocketPath) {
    return
  }

  if (webSocket && webSocket.readyState !== WebSocket.CLOSED) {
    return
  }

  if (timeout) {
    return
  }

  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'

  webSocket = new WebSocket(`${protocol}//${location.host}${webSocketPath}`)

  webSocket.addEventListener('open', () => {
    if (isReconnect) {
      location.reload()
    }

    clearTimeout(timeout)
    timeout = null
    isReconnect = false
  })

  webSocket.addEventListener('close', () => {
    timeout = setTimeout(() => {
      isReconnect = true
      timeout = null
      connect()
    }, 2000)
  })

  webSocket.addEventListener('message', event => {
    if (event.data === 'window-reload') {
      location.reload()
    }
  })
}

connect()
