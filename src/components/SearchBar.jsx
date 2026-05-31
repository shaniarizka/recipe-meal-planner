function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;