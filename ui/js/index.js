/* global WebSocket, websocketPort */

if (websocketPort) {
  const ws = new WebSocket(`ws://localhost:${websocketPort}`)

  ws.onmessage = event => {
    if (event.data === 'window-reload') {
      window.location.reload()
    }
  }
}
