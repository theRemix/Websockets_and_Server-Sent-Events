const http = require('http')
const express = require('express')
const app = express()
const Bundler = require('parcel-bundler')
const bundler = new Bundler('static/index.html')
const PORT = process.env.PORT || 3000

app.use('/api', require('./api'))

app.use('/images', express.static('static/images/'))

app.use(bundler.middleware())

app.listen(PORT, () =>
  console.log(`DEVELOPMENT server listening on port ${PORT}`)
)
