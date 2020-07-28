const { createServer } = require('net')

const clients = []

const clientConnected = client => {
  console.log('client connected')
  clients.push(client)

  client.on('end', () => {
    console.log('client disconnected')
    clients.splice(clients.indexOf(client), 1) // remove client from clients array
  })

  client.on('data', data => {
    console.log('Broadcasting:', data.toString())
    console.log('---------------')
    clients
      .filter(c => c != client)               // don't echo back to sender
      .forEach(c => c.write(data.toString())) // broadcast to all connected clients
  });
}

const server = createServer(clientConnected)

server.on('error', err => console.error(err))

server.listen(8080, () =>
  console.log('server listening on port 8080')
)

