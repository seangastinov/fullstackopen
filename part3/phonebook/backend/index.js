require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
// const mongoose = require("mongoose");
app.use(express.static('build')) //frontend static files inside backend

// let persons =[
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

app.use(cors())  // doesn't apply as our frontend and backend in the same port
app.use(express.json()) //json-parser

const customLogFormat = (tokens, req, res) => {
    if(tokens.method(req, res) === 'POST'){
        return `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens.res(req, res, 'content-length')} - ${tokens['response-time'](req, res)} ms {"name":"${req.body.name}","number":"${req.body.number}"}`;
    }
    return `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens.res(req, res, 'content-length')} - ${tokens['response-time'](req, res)} ms`;
}
app.use(morgan(customLogFormat))

app.get('/api/info', (request, response) => {
    Person.countDocuments({}).then(count => {
        response.send(`<p>Phonebook has info for ${count} people</p> ${new Date()}`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        console.log(person)
        response.json(person)
    })
    // if(person){
    //     response.json(person)
    // }else{
    //     response.status(404).end()
    // }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log('del id:',id)
    persons = persons.filter((i) => i.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body  //to make it readable json-parser is used
    if (body === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        console.log('HTTP POST is SUCCESSFUL', savedPerson)
        response.json(savedPerson)  //to send to the frontend
    })
    // if(person.name && person.number){
    //
    //     const nameDuplicate = persons.reduce((accumulator, currentValue) => {
    //         if(currentValue.name === person.name){
    //             accumulator = 1
    //             return accumulator
    //         }else{
    //             return accumulator
    //         }
    //     }, 0)
    //
    //     if(nameDuplicate === 0){
    //         person.id = Math.floor(Math.random()*1000000000000000)
    //         console.log('POST',person)
    //         persons = persons.concat(person)
    //         response.json(person)
    //     }
    //     else{
    //         response.status(400).json({
    //             error: 'name must be unique'
    //         })
    //     }
    //
    // }else{
    //     response.status(400).json({
    //         error: 'content missing'
    //     })
    // }
})
const PORT = process.env.PORT || 3001  //if environment variable is undefined we use 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})