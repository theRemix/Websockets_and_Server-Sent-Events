const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('dist'))
app.use(bodyParser.json())

app.use('/api', require('./api'))

app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)

