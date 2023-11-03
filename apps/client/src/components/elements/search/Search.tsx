import React, { useState, useEffect, useCallback } from 'react';
import { useSearchRecipes } from '@hooks/useSearch';
import { Recipe } from '@prisma/client';
import debounce from '@clientUtils/debounce'; // Ensure this is the correct path

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { results, search } = useSearchRecipes(searchTerm);

  // Create a debounced version of the search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      search(query);
    }, 300),
    [],
  );

  // Event handler for input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  // Clean up the debounce function on component unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        {results.map((recipe: Recipe) => (
          <div key={recipe.uid}>{recipe.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Search;
