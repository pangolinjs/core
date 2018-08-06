/* global WebSocket */

class Socket {
  constructor (port) {
    this.attempt = 1
    this.port = port
    this.timeout = null
    this.ws = null
  }

  /**
   * Connect to WebSocket
   */
  connect () {
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
      return
    }

    if (this.timeout) {
      return
    }

    this.ws = new WebSocket(`ws://localhost:${global.websocketPort}`)

    this.ws.addEventListener('open', () => {
      clearTimeout(this.timeout)
      this.timeout = null
      this.attempt = 1
    })

    this.ws.addEventListener('close', () => {
      // Limited growth equation
      const time = Math.floor(5000 - (5000 - 500) * Math.E ** (-0.05 * this.attempt))

      this.timeout = setTimeout(() => {
        this.attempt++
        this.timeout = null
        this.connect()
      }, time)
    })

    this.ws.addEventListener('message', event => {
      if (event.data === 'window-reload') {
        window.location.reload()
      }
    })
  }
}

if (global.websocketPort) {
  const socket = new Socket(global.websocketPort)
  socket.connect()
}
