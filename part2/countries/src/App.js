import {useState, useEffect} from "react"
import Find from './components/Find'
import countryService from '/Users/seangastinov/WebstormProjects/fullstackopen/part2/countries/src/services/country.js'
import Countries from "./components/Countries";

function App() {
    const [newFind, setFind] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        console.log('effect function is called')
        countryService.getAllCountries()
            .then((response) => {
                console.log('HTTP GET', response)
                setCountries(response.data)
            })
    }, [])

    console.log('countries has', countries.length, 'country')

    const findHandler = (event)=>{
        console.log('findHandler',event.target.value)
        setFind(event.target.value)
    }
  return (
    <div>
        <Find handler={findHandler} state={newFind}/>
        <Countries countries={countries} newFind={newFind}/>
    </div>
  )
}

export default App;