const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json()); // Parse JSON request bodies
app.use(cors())
app.use(express.static('dist')) //tarkastaa Express GET-tyyppisten HTTP-pyyntöjen yhteydessä ensin löytyykö pyynnön polkua vastaavan nimistä tiedostoa hakemistosta dist. Jos löytyy, palauttaa Express tiedoston.

// Define a custom token for logging POST request data
morgan.token('post-data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return ''; // Return empty string for non-POST requests
});

// Use Morgan with the custom token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));

const mongoose = require('mongoose')

// ÄLÄ KOSKAAN TALLETA SALASANOJA GitHubiin!
const url =
  `mongodb+srv://serkkupoika:serkkupoika@cluster0.sgksjwl.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

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

  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

  
  app.get('/info', (req, res) => {
    Person.countDocuments({}).then(count => {
      res.send(`Phonebook has info for ${count} people<br>${new Date()}`);
    });
  });

  // Route to fetch a single person by their ID
app.get('/api/persons/:id', (req, res) => {
  // Find a person by ID using Mongoose's findById
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person); // Send the found person as JSON
      } else {
        res.status(404).send('Person not found'); // If no person found, send 404
      }
    })
    .catch(error => res.status(400).send(error.message)); // Handle possible errors
});


  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const { name, number } = request.body;
  
    // Simple validation for name and number
    if (!name || !number) {
      return response.status(400).json({ error: 'The name and number are required.' });
    }
  
    // Check if the name already exists in the database
    Person.findOne({ name: name }).then(existingPerson => {
      if (existingPerson) {
        console.log('Name must be unique.')
        return response.status(400).json({ error: 'Name must be unique.' });
      }
  
      // Create a new person object with the request body
      const newPerson = new Person({
        name, // Name from the request body
        number, // Number from the request body
      });
  
      // Save the new person to the database
      newPerson.save()
        .then(savedPerson => {
          response.status(201).json(savedPerson);
        })
        .catch(error => response.status(400).json({ error: error.message }));
    });
  });
  

  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  morgan('tiny')

  //pieeru