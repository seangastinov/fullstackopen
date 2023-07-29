const Persons = ({listPersons, state})=>{
    const numberToShow = (state === '')
        ? listPersons
        : listPersons.filter(person =>
            person.name.toLowerCase().includes(state.toLowerCase()))
    console.log('numberToShow:',numberToShow)

    const result = numberToShow.map((i) => {
        return <div key={i.id}>{i.name} {i.number}</div>
    });

    console.log('persons:',listPersons)
    return(
        <>{result}</>
    )
}
export default Persons;