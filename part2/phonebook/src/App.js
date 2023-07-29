import { useState } from 'react'

const Name = ({persons})=>{
    const result = persons.map((i,index) => {
        return <div key ={index}>{i.name}</div>
    });
    console.log(persons)
    return(
        <>{result}</>
    )
}
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])

    const [newName, setNewName] = useState('')

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
        else if (newName === ''){
            return alert("Please insert the name")
        }else {
            const copyArray = persons.concat({name: newName})
            console.log("update persons state:", newName)
            console.log("reset newName state")
            setPersons(copyArray)
            setNewName('')
        }
    }
    const inputChangeHandler = (event) => {
        console.log("Change newName State:", event.target.value)
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName}
                                 onChange = {inputChangeHandler}
                                 id="newNameInput"
                                 placeholder="Enter name"/>
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