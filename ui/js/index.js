import './components/nav-active'
import './components/sidebar'

import DarkMode from './components/dark-mode'
import Socket from './components/socket'

if (document.querySelector('.js-dark-mode')) {
  const darkMode = new DarkMode({
    enableInput: document.querySelector('.js-dark-mode-enable'),
    disableInput: document.querySelector('.js-dark-mode-disable')
  })

  darkMode.init()
}

if (global.websocketPort) {
  const socket = new Socket({
    port: global.websocketPort
  })

  socket.connect()
}
