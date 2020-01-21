const net = require('net')
const test = require('ava')

const getPort = require('../../../../lib/utils/get-port')

test.serial('returns default port', async t => {
  const actual = await getPort()
  const expected = 8080

  t.is(actual, expected)
})

test.serial('returns desired port', async t => {
  const actual = await getPort(1337)
  const expected = 1337

  t.is(actual, expected)
})

test.serial('returns next available port', async t => {
  const server = await new Promise(resolve => {
    const server = net.createServer()
    server.listen(1337, () => {
      resolve(server)
    })
  })

  const actual = await getPort(1337)
  const expected = 1338

  server.close()

  t.is(actual, expected)
})
