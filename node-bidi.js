const { createServer } = require('net')

const clientConnected = client => {
  console.log('client connected')

  let interval = setInterval(() => {
    client.write(Date.now() + '\r\n')
  }, 2000)

  client.on('end', () => {
    console.log('client disconnected')
    clearInterval(interval)
  })

  client.on('data', data => {
    console.log('Client Said:', data.toString())
    console.log('---------------')
    // client.write('HTTP/1.1 200 OK\r\n')
    // client.write('\r\n')
    // client.write('Now i\'m speaking something else!')
    // client.end()
  });
}

const server = createServer(clientConnected)

server.on('error', err => console.error(err))

server.listen(8080, () =>
  console.log('server listening on port 8080')
)

