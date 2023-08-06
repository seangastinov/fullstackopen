import {useEffect} from "react";
import countryService from "../services/country";

const Weather = ({setWeather, weather, newFind, name})=>{
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        countryService.getWeather(name, api_key)
            .then((response => {
                console.log('HTTP GET Weather', response.data)
                setWeather(response.data)
            }))
            .catch((error) => {
                console.error('Error fetching country:', error)
            })
    }, [newFind])

    if (!weather) {
        return null
    }
    else {
        return(
            <div>
                <h1>Weather in {weather.location.name}</h1>
                <>temperature {weather.current.temp_c} Celsius</>
                <br/>
                <img src={weather.current.condition.icon} alt='weather'/>
                <br/>
                <>wind {weather.current.wind_kph} kph</>
            </div>
    )}
}

export default Weather