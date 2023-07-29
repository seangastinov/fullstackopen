import { useState } from 'react'

const Name = ({persons, newFilter})=>{
    const numberToShow = (newFilter === '')
        ? persons
        : persons.filter(person =>
            person.name.toLowerCase().includes(newFilter.toLowerCase()))
    console.log('numberToShow:',numberToShow)

    const result = numberToShow.map((i) => {
        return <div key={i.id}>{i.name} {i.number}</div>
    });

    console.log('persons:',persons)
    return(
        <>{result}</>
    )
}
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('Ada Lovelace')


    const addHandler = (event)=> {
        event.preventDefault()
        const check = persons.reduce((checker,current) =>{
            console.log(checker,current)
            if(current.name===newName) {
                return false
            }
            },true)

        if(check === false){
            return alert(newName + ' is already added to phonebook')
        }
        else if (newName === '' || newNumber === ''){
            return alert("Please insert the name and number")
        }else {
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
            <form>
                <div>
                    filter shown with <input value={newFilter}
                                 onChange = {inputFilterChangeHandler}
                                 id="newNameFilter"
                                 placeholder="Enter filter"/>
                </div>
                <h2>add a new</h2>
                <div>
                    name: <input value={newName}
                                 onChange = {inputNameChangeHandler}
                                 id="newNameInput"
                                 placeholder="Enter name"/>
                </div>
                <div>
                    number: <input value={newNumber}
                                   onChange = {inputPhoneChangeHandler}
                                   id="newPhoneInput"
                                   placeholder="Enter phone number"/>
                </div>
                <div>
                    <button type="submit" onClick={addHandler}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <Name persons={persons} newFilter={newFilter}/>
        </div>
  )
}

export default App