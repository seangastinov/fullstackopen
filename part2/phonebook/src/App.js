import {useEffect, useState} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        console.log('effect function is called')
        const eventHandler = response => {
            console.log('promise fulfilled', response)
            setPersons(response.data)
        }
        axios.get('http://localhost:3001/persons').then(eventHandler)
    }, [])

    console.log('phonebook has', persons.length, 'person')

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
                name: newName, number: newNumber
            }

            console.log("update persons state:", newName)
            console.log("reset newName state")

            axios
                .post('http://localhost:3001/persons', tempObject)
                .then((response) => {
                    console.log('add phones to server', response)
                    const copyArray = persons.concat(response.data)
                    setPersons(copyArray)
                    setNewName('')
                    setNewNumber('')
                    }
                )
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
