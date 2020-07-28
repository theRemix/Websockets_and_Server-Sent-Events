const { createServer } = require('net')

const clientConnected = client => {
  console.log('client connected')

  client.on('end', () => {
    console.log('client disconnected')
  })

  client.on('data', data => {
    console.log('Client Said:', data.toString())
    console.log('---------------')
    client.write('IDK HOW TO HTTP!\r\n')
    client.end()
  });
}

const server = createServer(clientConnected)

server.on('error', err => console.error(err))

server.listen(8080, () =>
  console.log('server listening on port 8080')
)
