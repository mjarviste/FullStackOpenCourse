import Country from './Country'

const Countries = ({filteredCountries, updateFilteredCountries}) => {

    const showCountry = (country) => {
        updateFilteredCountries(country)
    }
    if(!filteredCountries || filteredCountries.length === 0) return <><p>no matches</p></>
    if(filteredCountries.length > 10) {
    return(
        <>
            <p>Too many matches</p>
        </>
    )} else if (filteredCountries.length === 1) {
        const country = filteredCountries[0]
    return (
        <Country country={country} />
    )} else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
    return (
        <>
            <ul>{filteredCountries.map(country => <li key={country.cca2}>{country.name.common}<button onClick={() => showCountry(country)}>show</button></li>)}</ul>
        </>
    )}
}

export default Countries