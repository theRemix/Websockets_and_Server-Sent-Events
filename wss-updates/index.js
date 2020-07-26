const http = require('http')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const server = http.createServer(app)
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ server })
const wssHandler = require('./wss')

app.use(express.static('dist'))

app.use('/api', require('./api'))

wss.on('connection', wssHandler)

server.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)

