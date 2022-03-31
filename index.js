const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person === undefined) {
        response.status(404).end()
        return
    }
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person === undefined) {
        response.status(404).end()
    }
    persons = persons.filter(p => p.id !== id)
    response.status(200).end()
})

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random() * 1000000000)

  const isNewName = (n) => persons.find(p => p.name === n) === undefined
  if (request.body === undefined) {
    response.status(406).send({ error: "Missing person info"})
    return
  } else if (!request.body.number) {
    response.status(406).send({ error: "Missing number"})
    return
  } else if (!request.body.name) {
    response.status(406).send({ error: "Missing name"})
    return
  } else if (!isNewName(request.body.name)) {
    response.status(406).send({ error: "Duplicate name"})
    return
  }

  const name = request.body.name
  const number = request.body.number
  persons = persons.concat({ name, number ,id})
  response.status(200).end()
})

app.get('/info', (request, response) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${today.toLocaleString("en-US", options)}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})