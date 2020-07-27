const { Router } = require('express')
const api = Router()
const { agents, weapons } = require('./gameData')

const eventDataSource = []

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

    // purge old events
    if(eventDataSource.length >= 3) eventDataSource.splice(0,eventDataSource.length)

    // add new game event
    eventDataSource.push(gameEvents.next().value)

    queueGameEvent()

  }, Math.floor(Math.random() * 2000) + 200)
}

queueGameEvent()

api.get('/game-events', (req, res) =>
  res.json(eventDataSource)
)

module.exports = api
