const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(express.json()); // Parse JSON request bodies

// Define a custom token for logging POST request data
morgan.token('post-data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return ''; // Return empty string for non-POST requests
});

// Use Morgan with the custom token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));


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

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
  app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people<br>${Date()}`);
  });

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id); // Convert the id from string to number
    const person = persons.find(p => p.id === id); // Find the person with the given ID
  
    if (person) {
      res.json(person); // If the person is found, send it back as JSON
    } else {
      res.status(404).send('Person not found'); // If not found, send a 404 response
    }
  });

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const generateId = () => {
      const maxId = 1000000;
      let newId;
      do {
        newId = Math.floor(Math.random() * maxId);
      } while (persons.find(person => person.id === newId)); // Check if the ID already exists
      return newId;
    };
  
    // Assuming that the request body will have name and number
    const { name, number } = request.body;
  
    // Simple validation for name and number
    if (!name || !number) {
      return response.status(400).json({ error: 'The name and number are required.' });
    }
  
    // Check if the name already exists
    if (persons.some(person => person.name === name)) {
      return response.status(400).json({ error: 'Name must be unique.' });
    }
  
    // Create a new person object
    const newPerson = {
      name, // Name from the request body
      number, // Number from the request body
      id: generateId() // Unique ID for the new person

    };
  
    // Add the new person to the array
    persons = [...persons, newPerson];
  
    // Respond with the newly created person object
    response.status(201).json(newPerson);
  });
  
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  morgan('tiny')

  //kohdassa 3.6