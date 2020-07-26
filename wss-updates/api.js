const { Router } = require('express')
const api = Router()

api.get('/game-events', (req, res) =>
  res.json([]) // send all game events
)

module.exports = api
