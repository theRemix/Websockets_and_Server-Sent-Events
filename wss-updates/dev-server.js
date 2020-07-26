const http = require('http')
const express = require('express')
const app = express()
const Bundler = require('parcel-bundler')
const bundler = new Bundler('static/index.html')
const PORT = process.env.PORT || 3000

const server = http.createServer(app)
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ server });
const wssHandler = require('./wss')

app.use('/api', require('./api'))

wss.on('connection', wssHandler)

app.use('/images', express.static('static/images/'))

// parcel bundler for development
app.use(bundler.middleware())

server.listen(PORT, () =>
  console.log(`DEVELOPMENT server listening on port ${PORT}`)
)
