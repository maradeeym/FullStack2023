const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
require('./mongo') // Tämä luo yhteyden MongoDB-tietokantaan

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

