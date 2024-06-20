const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => {
    return (
    <div>
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button onClick={addPerson} type="submit">add</button>
            </div>
      </form>

    </div>
    )
}

export default PersonForm