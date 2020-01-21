const test = require('ava')

const isUnspecifiedHost = require('../../../../lib/utils/is-unspecified-host')

test('is unspecified IPv4 host', t => {
  const actual = isUnspecifiedHost('0.0.0.0')

  t.true(actual)
})

test('is unspecified IPv6 host', t => {
  const actual = isUnspecifiedHost('::')

  t.true(actual)
})

test('is not unspecified IPv4 host', t => {
  const actual = isUnspecifiedHost('127.0.0.1')

  t.false(actual)
})

test('is not unspecified IPv6 host', t => {
  const actual = isUnspecifiedHost('::1')

  t.false(actual)
})
