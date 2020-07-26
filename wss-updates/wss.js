const { agents, weapons } = require('./gameData')

// store connected clients in an array
const clients = []

const wssHandler = client => {

  // add client to list of clients
  clients.push(client)

  // handle incoming messages from client
  client.on('message', message => {
    console.log('received: %s', message)
  })

  // Mandatory! remove client from client list
  client.on('close', () => {
    console.log('client disconnected ')
    clients.splice(
      clients.indexOf(client), 1
    )
  })

  // handle errors
  client.on('error', e => {
    console.log('connection error: %s', e)
  })

}

// generate random game events
const gameEvents = (function* (){

  while(true){

    const weaponIdx = Math.floor(Math.random() * weapons.length)
    const sourcePlayerIdx = Math.floor(Math.random() * agents.length)
    let targetPlayerIdx = Math.floor(Math.random() * agents.length)
    while(sourcePlayerIdx === targetPlayerIdx) targetPlayerIdx = Math.floor(Math.random() * agents.length)

    yield {
      id: Date.now(),
      type: "KILL",
      sourcePlayer: agents[sourcePlayerIdx],
      targetPlayer: agents[targetPlayerIdx],
      weapon: weapons[weaponIdx],
    }
  }
})()

const queueGameEvent = () => {
  setTimeout(() => {

    // broadcast new game event
    clients.forEach(client =>
      client.send(
        JSON.stringify(
          gameEvents.next().value
        )
      )
    )

    queueGameEvent()

  }, Math.floor(Math.random() * 2000) + 200)
}

queueGameEvent()

module.exports = wssHandler
