// Search.tsx
import React, { useState } from 'react';
import useSearch from '@hooks/useSearch'; // Update with the correct path
import useDebounce from '@hooks/useDebounce'; // Update with the correct path to your useDebounce hook

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { results } = useSearch(searchTerm);
  const debounce = useDebounce<(newSearchTerm: string) => void>();

  // Create a debounced function to update the search term
  const debouncedSetSearchTerm = debounce((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  }, 800);

  // Event handler that invokes the debounced function
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchTerm(event.target.value);
  };

  // Render the search input
  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleSearchChange}
      />
      {/* Render search results or a loading indicator as needed */}
    </div>
  );
};

export default Search;
