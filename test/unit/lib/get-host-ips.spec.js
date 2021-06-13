import test from 'ava'

import getHostIPs from '../../../lib/get-host-ips.js'

test('gets host IPs', t => {
  const result = getHostIPs()

  for (const ip of result) {
    t.true(typeof ip === 'string')
  }
})
