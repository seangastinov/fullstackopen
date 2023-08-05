import countryService from '/Users/seangastinov/WebstormProjects/fullstackopen/part2/countries/src/services/country.js'

const Countries = ({newFind, countries, country, setCountry}) => {
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
                    <h1>{countryToShow[0].name.common}</h1>
                    <>capital {countryToShow[0].capital}</>
                    <br/>
                    <>area {countryToShow[0].area}</>
                    <p> <b>languages :</b> </p>
                    <ul>
                        {/*Returns an array of all the keys (language codes) from the languages object*/}
                        {Object.keys(countryToShow[0].languages).map((langCode) => {
                            console.log('langCode', langCode)
                            return(
                                <li key={langCode}>
                                    {countryToShow[0].languages[langCode]}
                                </li>
                            )}
                        )}
                    </ul>
                    <img src={countryToShow[0].flags.png} alt='flag'/>
                </div>
            )
        }

        else{
            return ( countryToShow.map((i) => {
                if(country[i.name.common]) {
                    return(
                        <div key={i.ccn3}>{i.name.common}  <button
                            type='button'
                            onClick={()=> showHandler(i.name.common)}>
                            show</button>
                            <h1>{country[i.name.common].name.common}</h1>
                            <>capital {country[i.name.common].capital}</>
                            <br/>
                            <>area {country[i.name.common].area}</>
                            <p> <b>languages :</b> </p>
                            <ul>
                                {/*Returns an array of all the keys (language codes) from the languages object*/}
                                {Object.keys(country[i.name.common].languages).map((langCode) => {
                                    console.log('langCode', langCode)
                                    return(
                                        <li key={langCode}>
                                            {country[i.name.common].languages[langCode]}
                                        </li>
                                    )}
                                )}
                            </ul>
                            <img src={country[i.name.common].flags.png} alt='flag'/>
                        </div>
                    )
                }
                return(
                    <div key={i.ccn3}>{i.name.common}  <button
                        type='button'
                        onClick={()=> showHandler(i.name.common)}>
                        show</button>
                    </div>
                )
            }))
            }
        }
}

export default Countries