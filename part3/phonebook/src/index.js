const express = require('express')
const app = express()

let persons =[
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

app.use(express.json()) //json-parser

app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> ${new Date()}`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log('get id:',id)
    const person = persons.find((i) => i.id === id)
    console.log(person)
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log('delete id:',id)
    persons = persons.filter((i) => i.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body  //to make it readable json-parser is used
    person.id = Math.floor(Math.random()*1000000000000000)
    console.log('POST',person)
    persons = persons.concat(person)
    response.json(person)
})
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})