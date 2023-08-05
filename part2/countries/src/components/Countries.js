const Countries = ({newFind, countries}) => {
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
                return (
                    <div key={i.ccn3}>{i.name.common}</div>
                )
            }))
        }
    }
}

export default Countries