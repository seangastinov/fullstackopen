import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const promise = axios.get(baseUrl)
    return promise.then((response) => {
        console.log('HTTP GET', response)
        return response.data
        }
    )
}

const create = (newObject) => {
    const promise = axios.post(baseUrl,newObject)
    return promise.then((response) => {
            console.log('HTTP POST', response)
            return response.data
        }
    )
}
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => {
        console.log('HTTP PUT', response)
        return response.data
    })
}

export default {getAll,create,update}