const http = require('http')

let persons = [
    { 
      name: 'Arto Hellas', 
      number: '040-123456',
      id: 1
    },
    { 
      name: 'Ada Lovelace', 
      number: '39-44-5323523',
      id: 2
    },
    { 
      name: "Dan Abramov", 
      number: '12-43-234345',
      id: 3
    },
    { 
      name: "Mary Poppendieck", 
      number: '39-23-6423122',
      id: 4
    }
  ]


const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end(JSON.stringify(persons))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)