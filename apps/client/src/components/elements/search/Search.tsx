// Search.tsx
import React, { useState, useCallback } from 'react';
import { useSearchRecipes } from '@hooks/useSearch';
import { Recipe } from '@prisma/client';
import debounce from '@clientUtils/debounce'; // Ensure this is the correct path

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { results, search } = useSearchRecipes();

  // Define the debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      search(query);
    }, 300),
    [search],
  );

  // Event handler for input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

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
