const { Router } = require('express')
const api = Router()

api.get('/game-events', (req, res) => {

  res.end('works')
})

module.exports = api
