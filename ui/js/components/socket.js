/**
 * WebSocket with auto-reconnect
 */
export default class Socket {
  /**
   * Create new socket
   * @param {Object} options Options
   * @param {number} options.port WebSocket port
   */
  constructor (options) {
    this.attempt = 1
    this.port = options.port
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

    this.ws = new WebSocket(`ws://${window.location.hostname}:${global.websocketPort}`)

    this.ws.addEventListener('open', () => {
      // Reload on reconnect
      if (this.attempt > 1) {
        window.location.reload()
      }

      clearTimeout(this.timeout)
      this.timeout = null
      this.attempt = 1
    })

    this.ws.addEventListener('close', () => {
      // Limited growth equation approaches 5000ms
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
