import { useState,useEffect } from 'react'
import serverServices from './services/serverServices'
import Countries from './components/Countries'

const App = () => {
  const [allCountries, setAllCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(null)

  useEffect(() => {
    serverServices.getAll()
    .then(countriesData => setAllCountries(countriesData))
  }, [])

  const handleSearchChange = (event) => {
    if(event.target.value === "") {
      setFilteredCountries(null);
    } else {
      const filterArray = allCountries.filter((country) => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
      setFilteredCountries(filterArray);
    }
  }

  const updateFilteredCountries = (countries) => {
    console.log('siin')
    setFilteredCountries([countries])
  }

  return (
    <>
      <div>
        find countries<input className='search' onChange={handleSearchChange}/>
        <Countries filteredCountries={filteredCountries} updateFilteredCountries={updateFilteredCountries}/>
      </div>
    </>
  )
}

export default App
