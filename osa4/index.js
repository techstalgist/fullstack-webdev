const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(config.mongoUrl, { useMongoClient: true })
mongoose.Promise = global.Promise

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

const PORT = config.port
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}