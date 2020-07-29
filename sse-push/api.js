const { Router } = require('express')
const api = Router()
const { agents, weapons } = require('./gameData')

// store connected clients in an array
const clients = []

api.get('/game-events', (req, res) => {
  // headers to persist open connection
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  }
  res.writeHead(200, headers)

  // add connected client 'res' to client liset
  clients.push(res)

  // Mandatory! remove client from client list
  req.on('close', () => {
    console.log('client disconnected ')
    clients.splice(
      clients.indexOf(res), 1
    )
  })

  // optionally send first update
  // res.write(JSON.stringify({ connected: true })+'\n\n')
})

api.post('/like', (req, res) => {
  if(!['id','x','y'].every(param => req.body.hasOwnProperty(param)))
    return res.json({error: 'Required params: id, x, y'})

  const { id, x, y } = req.body

  // broadcast "<3" to all connected clients
  clients.forEach(client => client.write(
    'data: ' +
    JSON.stringify({
      op: 'LIKE',
      payload: { id, x, y }
    }) + '\n\n' // <-------------- separate entries with empty line
  ))

  res.json({ success: true })
})

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
      weapon: weapons[weaponIdx]
    }
  }
})()

const queueGameEvent = () => {
  setTimeout(() => {

    // broadcast new game event
    clients.forEach(client =>
      client.write( // <------------- res.write()
        'data: ' +
        JSON.stringify({
          op: 'GAME_EVENT',
          payload: gameEvents.next().value
        }) + '\n\n' // <-------------- separate entries with empty line
      )
    )

    queueGameEvent()

  }, Math.floor(Math.random() * 2000) + 200)
}

queueGameEvent()

module.exports = api
