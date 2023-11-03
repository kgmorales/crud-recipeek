// Search.tsx
import React, { useState } from 'react';
import { useSearchRecipes } from '@hooks/useSearch'; // Update with the correct path
import debounce from '@clientUtils/debounce'; // Ensure this is the correct path to your debounce function

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { results, isLoading } = useSearchRecipes(searchTerm);

  // Debounce the search term input to limit the number of API calls
  const debouncedSearch = debounce((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  }, 500); // Adjust the debounce time as needed

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    debouncedSearch(newSearchTerm);
  };
  console.log({ searchTerm, results });
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
