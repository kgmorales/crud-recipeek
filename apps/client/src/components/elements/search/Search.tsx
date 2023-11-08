import React, { useState, useEffect } from 'react';

import { useSearchContext } from '@contexts';
import { useSearch, useDebounce } from '@hooks';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setResults } = useSearchContext();
  const { results } = useSearch(searchTerm);
  const debounce = useDebounce();

  //* Update the context whenever the results change
  useEffect(() => {
    setResults(results);
  }, [results, setResults]);

  //* Create a debounced function to update the search term
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
