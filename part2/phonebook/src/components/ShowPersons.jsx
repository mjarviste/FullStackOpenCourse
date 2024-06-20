import personService from '../services/persons'

const ShowPersons = ({searchValue, persons, filteredPersons,deletePerson}) => {
    if(searchValue === '') {
        return persons.map(person => <div key={person.id}><p key={person}>{person.name} {person.number}</p><button onClick={() => deletePerson(person.id)}>Delete</button></div>)
    }
    else {
        return filteredPersons.map(filteredPerson => <div key={filteredPerson.id}><p key={filteredPerson}>{filteredPerson.name} {filteredPerson.number}</p><button onClick={() => deletePerson(filteredPerson.id)}>Delete</button></div>)
    }
}

export default ShowPersons