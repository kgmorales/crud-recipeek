// Search.tsx
import React, { useState } from 'react';
import { useDebounce } from '@hooks'; // Ensure this is the correct path to your useDebounce function
import { useSearch } from '@hooks'; // Update with the correct path

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debounce = useDebounce<(term: string) => void>(); // Instantiate the debounced function

  // Create a debounced function that updates the search term
  const debouncedSetSearchTerm = debounce((newTerm) => {
    setSearchTerm(newTerm);
  }, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchTerm(event.target.value); // Call the debounced function with the new value
  };

  // Call useSearch hook with the debounced search term
  useSearch(searchTerm);

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleSearchChange}
        value={searchTerm} // Controlled input
      />
      {/* Render UI based on search input */}
    </div>
  );
};

export default Search;
