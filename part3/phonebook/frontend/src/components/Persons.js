import personService from '/Users/seangastinov/WebstormProjects/fullstackopen/part3/phonebook/frontend/src/services/persons.js'
const Persons = ({statePersons, stateFilter, setPersons})=>{
    const numberToShow = (stateFilter === '')
        ? statePersons
        : statePersons.filter(person =>
            person.name.toLowerCase().includes(stateFilter.toLowerCase()))
    console.log('numberToShow:',numberToShow)

    const handlerDelete = (name,id) => {
        if(window.confirm(`Delete ${name} ?`)){
            console.log('delete button triggered for',name)
            personService.deletePerson(id)
                .then((returnedPerson) => {
                    console.log('delete success', returnedPerson)
                    setPersons(statePersons.filter(i => i.id !== id))
                })
        }
    }

    const result = numberToShow.map((i) => {
        return(
            <div key={i.id}>
                {i.name} {i.number}   <button
                onClick ={() => {handlerDelete(i.name,i.id)}}
                type = "submit">
                delete
                </button>
            </div>
        )
    });

    console.log('persons:',statePersons)
    return(
        <>{result}</>
    )
}
export default Persons;