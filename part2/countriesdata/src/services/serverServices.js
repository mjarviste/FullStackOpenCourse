import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const weatherUrl = ''

const getAll = () => {
    return axios.get(`${baseUrl}api/all`).then(response => response.data)
}

const getWeather = (city, apiKey) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.data)
}

export default {getAll, getWeather}