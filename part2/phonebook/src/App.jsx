import { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'
import axios from 'axios'
import personService from './services/persons'
import ApprovedMessage from './components/ApprovedMessage'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setNewSearchValue] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [approveMessage, setApproveMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    axios
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(newNumber === '' || newName === '') {
      alert('Enter name and number')
      return
    }
    const personNames = persons.map(person => person.name);
    const personNumbers = persons.map(person => person.number);
    for(let i=0; i<personNames.length; i++) {
      let name= personNames[i];
      let number = personNumbers[i]
      console.log('Element', name)
      if(name === newName) {
        if(number === newNumber) {
          alert(`${newName} already added`)
          setNewName('')
          setNewNumber('')
          return
        }
        else {
          if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
            const changedPerson = {...persons.find(person => person.name === newName), number: newNumber}
            personService.changePerson(changedPerson).then(response => {
              setPersons(persons.map(person => person.id !== changedPerson.id ? person : response.data))
              setFilteredPersons(filteredPersons.map(person => person.id !== changedPerson.id ? person : response.data))
            })
            setApproveMessage(`${newName} updated`)
            setTimeout(() => {
              setApproveMessage(null)
            }, 3000)
            return
          }
          else return
        }
      }
    }
    const newPersonObject = {name: newName, number: newNumber}
    //const addedPersons = persons.concat(newPersonObject)
    personService.addPerson(newPersonObject).then(response => {
      setPersons(persons.concat(response.data))
      setFilteredPersons(filteredPersons.concat(response.data))
      console.log('Added person', response.data)
    })
    setApproveMessage(`${newName} added to phonebook`)
    setTimeout(() => {
      setApproveMessage(null)
    }, 3000)
    //console.log('persons', addedPersons)
    setNewName('')
    setNewNumber('')
  }

  const getPersonById = (id) => {
    return persons.find(person => person.id === id)
  }

  const deletePerson = (id) => {
    const deletedPersonName = getPersonById(id).name
    if (window.confirm(`Delete ${deletedPersonName}?`)) {
      personService.deletePerson(id).then(response => {
        setPersons(persons.filter((person) => {
          console.log('person id', person.id)
          console.log('id',id)
          return person.id != id
        }))
        setFilteredPersons(filteredPersons.filter((filteredPerson) => {
          return filteredPerson.id != id
        }))
        setApproveMessage(`${deletedPersonName} deleted`)
        setTimeout(() => {
          setApproveMessage(null)
        }, 3000)
      }).catch((error) => {
        console.log('Error', error);
        setErrorMessage(`${deletedPersonName} already deleted, refresh the page`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
    else {
      return
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setNewSearchValue(event.target.value)
    const addedFilteredPersons = persons.filter((person) => {
      return person.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFilteredPersons(addedFilteredPersons)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <ApprovedMessage approvedMessage={approveMessage} />
      <ErrorMessage errorMessage={errorMessage} />
      <SearchFilter searchValue={searchValue} handleSearchChange={handleSearchChange} />
      <h2>Add a new number</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <ShowPersons persons={persons} filteredPersons={filteredPersons} searchValue={searchValue} deletePerson={deletePerson} />
    </div>
  )
}

export default App