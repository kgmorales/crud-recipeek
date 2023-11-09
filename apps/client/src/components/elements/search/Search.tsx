import React, { useState, useCallback } from 'react';
import debounce from '@clientUtils/debounce'; // Adjust the import path to where your debounce utility is located
import { useSearch } from '@hooks'; // Update with the correct path

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [value, setValue] = useState(''); // This state will keep the input value

  // Call useSearch hook with the debounced search term
  useSearch(searchTerm);

  // Debounce setSearchTerm function
  const debouncedSetSearchTerm = useCallback(
    debounce((newTerm: string) => {
      setSearchTerm(newTerm);
    }, 500),
    [], // Dependencies array is empty, meaning the debounced function will be created once per component instance
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update value state as user types
    setValue(event.target.value);
    // Call the debounced function with the new value
    debouncedSetSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleSearchChange}
        value={value} // Controlled input using value state
      />
      {/* Render UI based on search input */}
    </div>
  );
};

export default Search;
