/* globals pangolinSocketPath */

import Sockette from 'sockette'

/**
 * Communicator for server <-> client message brokering
 * @param {Function} Vue Vue constructor
 */
export default function (Vue) {
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
  const host = location.host

  const EventBus = new Vue()

  let isReconnect = false

  function onopen () {
    if (isReconnect) {
      location.reload()
    }

    isReconnect = true
  }

  function onmessage (message) {
    if (message.data === 'reload') {
      EventBus.$emit('reload')
    }
  }

  // eslint-disable-next-line no-new
  new Sockette(`${protocol}//${host}${pangolinSocketPath}`, {
    onopen,
    onmessage
  })

  Vue.prototype.$communicator = EventBus
}
