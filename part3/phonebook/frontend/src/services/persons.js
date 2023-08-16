import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
    const promise = axios.get(baseUrl)
    return promise.then((response) => {
        console.log('HTTP GET', response)
        return response.data
        }
    )
}

const create = (newObject) => {
    return axios.post(baseUrl,newObject)
}
const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}
const deletePerson = (id) => {
    const promise = axios.delete(`${baseUrl}/${id}`)
    return promise.then(response => {
        console.log('HTTP DELETE', response)
        return response.data
    })
}

export default {getAll,create,update, deletePerson}