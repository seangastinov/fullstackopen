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
        minlength: [3, 'Path \'name\' (\'{VALUE}\') is shorter than the minimum allowed length (3)'],
    },
    number: {
        type : String,
        validate : {
            validator: value => {
                if(value.length>=8){
                    const regex = /^\d{2,3}-\d+$/
                    return regex.test(value)
                }
                else{
                    return false
                }
            },
            message: 'Path \'number\' (\'{VALUE}\') is must has length of 8 or more, and' +
            ' the first part has two or three numbers and the second part also consists of numbers and seperated by \'-\'.'
        }
    }
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