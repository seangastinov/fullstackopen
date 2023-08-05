import {useEffect, useState} from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        console.log('effect function is called')
        personService.getAll()
            .then((initialPersons) => {  //initialPersons === response.data
                setPersons(initialPersons)
            })
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

            personService.create(tempObject)
                .then((returnedPerson) =>{
                    setPersons(persons.concat(returnedPerson))
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
                <Persons statePersons={persons} stateFilter={newFilter} setPersons={setPersons}/>
            </div>
  )
}

export default App
