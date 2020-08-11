import test from 'ava'

import formatIP from '../../../lib/format-ip.mjs'

test('formats localhost IPv4', t => {
  const result = formatIP('0.0.0.0')
  t.is(result, 'localhost')
})

test('formats localhost IPv6', t => {
  const result = formatIP('::')
  t.is(result, 'localhost')
})

test('returns non-localhost IP', t => {
  const result = formatIP('10.0.0.0')
  t.is(result, '10.0.0.0')
})
