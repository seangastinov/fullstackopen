const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const uri = process.env.MONGODB_URI

console.log('connecting to', uri)

mongoose.connect(uri)
    .then(result => {
        console.log('connected to MongoDB:', result)
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'Path \'name\' (\'{VALUE}\') is shorter than the minimum allowed length (3).'],
    },
    number: String,
})

//This transform function is called ONLY when person.toJSON() is executed in index.js
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        console.log('This transform function is called')
    }
})

module.exports = mongoose.model('Person', personSchema)