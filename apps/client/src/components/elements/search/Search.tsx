// Search.tsx
import React, { useState, useEffect } from 'react';
import useSearch from '@hooks/useSearch'; // Make sure this path is correct
import { useSearchContext } from '@contexts/Search.context'; // Make sure this path is correct
import useDebounce from '@hooks/useDebounce'; // Make sure this path is correct

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setResults } = useSearchContext(); // Get setResults from context
  const { results } = useSearch(searchTerm); // Get results from useSearch hook
  const debounce = useDebounce(); // Make sure to define the debounced function correctly

  // Update the context whenever the+ results change
  useEffect(() => {
    setResults(results); // This will update the context with the new results
  }, [results, setResults]);

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
    </div>
  );
};

export default Search;
