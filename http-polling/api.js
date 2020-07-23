const { Router } = require('express')
const api = Router()

const eventDataSource = []

const queueGameEvent = () => {
  setTimeout(() => {

    // simulate clear out the db every game
    if(eventDataSource.length >= 20) eventDataSource.splice(0,eventDataSource.length)

    // add new game event
    eventDataSource.push({
      id: Date.now(),
    })

    queueGameEvent()

  }, Math.floor(Math.random() * 2000) + 200)
}

queueGameEvent()

api.get('/game-events', (req, res) =>
  res.json(eventDataSource)
)

module.exports = api
