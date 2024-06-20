const SearchFilter = ({searchValue, handleSearchChange}) => {
    return (
        <div>
            Filter shown with <input value={searchValue} onChange={handleSearchChange} />
        </div>
    )
}
export default SearchFilter