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
        const tempC = weather.main.temp-273
        return(
            <div>
                <h1>Weather in {weather.name}</h1>
                <>temperature {tempC.toFixed(2)} Celsius</>
                <br/>
                <img src={`https://openweathermap.org/img/wn/${ weather.weather[0].icon}@2x.png`} alt='weather'/>
                <br/>
                <>wind {weather.wind.speed} m/s</>
            </div>
    )}
}

export default Weather