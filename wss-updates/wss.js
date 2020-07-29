const { agents, weapons } = require('./gameData')

// store connected clients in an array
const clients = []

const handleLike = (client, message) => {

  const { id, x, y } = message

  // broadcast "<3" to all connected clients
  clients.forEach(client => client.send(
    JSON.stringify({
      op: 'LIKE',
      payload: { id, x, y }
    })
  ))
}

const wssHandler = client => {

  // add client to list of clients
  clients.push(client)

  // handle incoming messages from client
  client.on('message', message => {
    console.log('received: %s', message)
    const { op, payload } = JSON.parse(message)
    switch(op){
      case 'LIKE':
        handleLike(client, payload)
        break;
      default: console.warn(`RECEIVED UNSUPPORTED OP: ${op}`)
    }
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
    const type = Math.random() < .5 ? "KILL" : "DEATH"

    yield {
      id: Date.now(),
      type,
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
        JSON.stringify({
          op: 'GAME_EVENT',
          payload: gameEvents.next().value
        })
      )
    )

    queueGameEvent()

  }, Math.floor(Math.random() * 2000) + 200)
}

queueGameEvent()

module.exports = wssHandler
