import React, { useState, useEffect } from 'react';
import { useSearchRecipes } from '@hooks/useSearch'; // Update with the correct path
import { Recipe } from '@prisma/client'; // Assuming this is the correct path to your Recipe type
import debounce from '@clientUtils/debounce'; // Update with the correct path to your debounce utility

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { results, search } = useSearchRecipes();
  console.log({ searchTerm, results });

  // Define the debounced function
  const debouncedSearch = debounce((query: string) => {
    search(query);
  }, 300);

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
