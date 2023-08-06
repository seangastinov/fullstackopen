import countryService from '/Users/seangastinov/WebstormProjects/fullstackopen/part2/countries/src/services/country.js'
import Weather from "./Weather";
import {useEffect} from "react"
import SingleCountry from "./SingleCountry";
const Countries = ({newFind, countries, country, setCountry, weather, setWeather}) => {
    const showHandler = (name) => {
        if (country[name]) {
            setCountry({ ...country, [name]: null })
            console.log(`make ${name} null`)
        } else {
            countryService.getCountry(name)
                .then((response) => {
                    console.log('HTTP GET', response);
                    setCountry({ ...country, [name]: response.data })
                })
                .catch((error) => {
                    console.error('Error fetching country:', error);
                });
        }
    };

    if(newFind === ''){
        return null
    }
    else{
         const countryToShow = countries.filter(country =>
            country.name.common.toLowerCase().includes(newFind.toLowerCase()))

        if(countryToShow.length > 10) {
            return <div>Too many matches, specify another filter</div>
        }
        else if (countryToShow.length === 0) {
            return (<div>Not matched any country</div>)
        }

        else if(countryToShow.length === 1){
            return(
                <div>
                    <SingleCountry name={countryToShow[0].name.common} capital={countryToShow[0].capital}
                               languages={countryToShow[0].languages} area={countryToShow[0].area}
                               flag={countryToShow[0].flags.png}/>
                    <Weather newFind={newFind} weather={weather} setWeather={setWeather} name={countryToShow[0].name.common}/>
                </div>
            )
        }

        else{
            return (countryToShow.map((i) => {
                if(country[i.name.common]) {
                    return(
                        <div key={i.ccn3}>{i.name.common}  <button
                            type='button'
                            onClick={()=> showHandler(i.name.common)}>
                            show</button>
                            <SingleCountry name={country[i.name.common].name.common} capital={country[i.name.common].capital}
                                           area={country[i.name.common].area} flag={country[i.name.common].flags.png}
                                           languages={country[i.name.common].languages}/>
                        </div>
                    )
                }
                else {
                    return (
                        <div key={i.ccn3}>{i.name.common}
                            <button
                                type='button'
                                onClick={() => showHandler(i.name.common)}>
                                show
                            </button>
                        </div>
                    )
                }
            }))
            }
        }
}

export default Countries