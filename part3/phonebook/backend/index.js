const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))

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

app.use(cors())
app.use(express.json()) //json-parser

const customLogFormat = (tokens, req, res) => {
    if(tokens.method(req, res) === 'POST'){
        return `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens.res(req, res, 'content-length')} - ${tokens['response-time'](req, res)} ms {"name":"${req.body.name}","number":"${req.body.number}"}`;
    }
    return `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens.res(req, res, 'content-length')} - ${tokens['response-time'](req, res)} ms`;
}
app.use(morgan(customLogFormat))

app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> ${new Date()}`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log('id:',id)
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
    console.log('del id:',id)
    persons = persons.filter((i) => i.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body  //to make it readable json-parser is used
    if(person.name && person.number){

        const nameDuplicate = persons.reduce((accumulator, currentValue) => {
            if(currentValue.name === person.name){
                accumulator = 1
                return accumulator
            }else{
                return accumulator
            }
        }, 0)

        if(nameDuplicate === 0){
            person.id = Math.floor(Math.random()*1000000000000000)
            console.log('POST',person)
            persons = persons.concat(person)
            response.json(person)
        }
        else{
            response.status(400).json({
                error: 'name must be unique'
            })
        }

    }else{
        response.status(400).json({
            error: 'content missing'
        })
    }
})
const PORT = process.env.PORT || 3001  //if environment variable is undefined we use 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})