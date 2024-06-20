import axios from 'axios'
import {useState, useEffect} from 'react'
import serverServices from '../services/serverServices'

const Country = ({country}) => {

    const [weather, setWeather] = useState(null)
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY

    useEffect(() => {
        serverServices.getWeather(country.capital, apiKey)
        .then(weatherData => setWeather(weatherData))
    }, [])
    if(!weather) return null;
    return (
        <>
            {console.log(weather)}
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <p><b>languages:</b></p>
            <ul>
                {Object.values(country.languages).map(language => <li key={Object.values(country.languages).indexOf(language)}>{language}</li>)}
            </ul>
            <img className="flag" src={country.flags.svg} alt={country.flags.alt}/>
            <h2>Weather in {country.capital}</h2>
            <p>Tempreture: {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>Wind: {weather.wind.speed} m/s</p>
        </>
    )
}

export default Country