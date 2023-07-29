import { useState } from 'react'

const Name = ({persons})=>{
    const result = persons.map((i,index) => {
        return <div key ={index}>{i.name} {i.phone}</div>
    });

    console.log(persons)
    return(
        <>{result}</>
    )
}
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas',phone: '040-1234567' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')


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
                name: newName, phone: newNumber
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

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
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
            <Name persons={persons}/>
        </div>
  )
}

export default App