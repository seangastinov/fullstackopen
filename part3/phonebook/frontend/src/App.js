import {useEffect, useState} from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [message, setMessage] = useState(['',''])

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

        let tryObject
        const check = persons.reduce((checker,person) =>{
            console.log(checker,person)
            if(person.name === newName) {
                tryObject = person
                return false
            }
            return checker
            },true)

        if(check === false){
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                const newObject = {...tryObject, number : newNumber}
                personService.update(newObject.id,newObject)
                    .then((response) => { //response is what we get from the backend's index.js by response.json(person)
                        setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))
                        setMessage([`Added ${response.data.name}`, 'success']);
                        setTimeout(() => {
                            setMessage(['',''])
                        }, 5000)})

                    .catch((error)=>{
                        console.log(error)
                        setMessage([`Information of ${newName} has already been removed from server`, 'error'])
                        setTimeout(() => {
                            setMessage(['',''])
                        }, 5000)
                        personService.getAll()
                            .then((returnedPersons) => {
                                console.log('HTTP GET to update the removed person')
                                setPersons(returnedPersons)
                            })
                    })
            }
        }

        else{
            const tempObject = {
                name: newName, number: newNumber
            }

            console.log("update persons state:", newName)
            console.log("reset newName state")

            personService.create(tempObject)
                .then((response) => {  //response is the variable that is returned in the backend
                    console.log('HTTP POST', response)
                    if (response.status === 200) {  //update the state
                        setPersons(persons.concat(response.data))
                        setNewName('')
                        setNewNumber('')
                        setMessage([`Added ${response.data.name}`, 'success']);
                        setTimeout(() => {
                            setMessage(['',''])
                        }, 5000)
                    }
                })
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
                <Notification message={message[0]} type={message[1]}/>
                <Filter handler={inputFilterChangeHandler} state={newFilter}/>
                <h3>Add a new</h3>
                <PersonForm newName={newName} newNumber={newNumber} addHandler={addHandler} nameHandler={inputNameChangeHandler} phoneHandler={inputPhoneChangeHandler} />
                <h3>Numbers</h3>
                <Persons statePersons={persons} stateFilter={newFilter} setPersons={setPersons}/>
            </div>
  )
}

export default App
