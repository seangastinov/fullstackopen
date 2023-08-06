import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/'
const getAllCountries = () => {
    return axios.get(`${baseURL}api/all`)
}
const getCountry = (name) => {
    return axios.get(`${baseURL}api/name/${name}`)
}

const getWeather = (name, apiKey) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`)
}


export default {getAllCountries, getCountry, getWeather}