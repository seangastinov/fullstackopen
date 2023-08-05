import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/'
const getAllCountries = () => {
    return axios.get(`${baseURL}api/all`)
}
const getCountry = (name) => {
    return axios.get(`${baseURL}api/name/${name}`)
}


export default {getAllCountries, getCountry}