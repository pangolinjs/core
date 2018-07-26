// TODO: Search for free port
const ws = new WebSocket('ws://localhost:12345')

ws.onmessage = event => {
  if (event.data === 'window-reload') {
    window.location.reload()
  }
}
