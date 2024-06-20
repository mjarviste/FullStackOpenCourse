import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const addPerson = newPerson => {
   return axios.post(baseUrl, newPerson)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const changePerson = changedPerson => {
    return axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson)
}

export default {getAll, addPerson, deletePerson, changePerson}

