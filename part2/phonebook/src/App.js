import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')


    const addHandler = (event)=> {
        event.preventDefault()

        if (newName === '' || newNumber === ''){
            return alert("Please insert the name and number")
        }

        const check = persons.reduce((checker,person) =>{
            console.log(checker,person)
            if(person.name === newName) {
                return false
            }
            return checker
            },true)

        if(check === false){
            return alert(newName + ' is already added to phonebook')
        }
        else{
            const tempObject = {
                name: newName, number: newNumber, id:persons[persons.length-1].id + 1
            }

            const copyArray = persons.concat(tempObject)
            console.log("update persons state:", newName)
            console.log("reset newName state")

            setPersons(copyArray)
            setNewName('')
            setNewNumber('')
        }
    }

    const inputNameChangeHandler = (event) => {
        console.log("Change newName State:", event.target.value)
        setNewName(event.target.value)
    }

    const inputPhoneChangeHandler = (event) => {
        console.log("Change newPhone State:", event.target.value)
        setNewNumber(event.target.value)
    }

    const inputFilterChangeHandler = (event) => {
        console.log("Change newFilter State:", event.target.value)
        setNewFilter(event.target.value)
    }

    return (

            <div>
                <h2>Phonebook</h2>
                <Filter handler={inputFilterChangeHandler} state={newFilter}/>
                <h3>Add a new</h3>
                <PersonForm newName={newName} newNumber={newNumber} addHandler={addHandler} nameHandler={inputNameChangeHandler} phoneHandler={inputPhoneChangeHandler} />
                <h3>Numbers</h3>
                <Persons listPersons={persons} state={newFilter}/>
            </div>
  )
}

export default App
