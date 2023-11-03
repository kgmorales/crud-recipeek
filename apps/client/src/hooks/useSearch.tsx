// useSearchRecipes.ts
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@prisma/client'; // Ensure this is the correct path to your Recipe type

// Define a type for the return value of the hook
interface UseSearchRecipesReturn {
  results: Recipe[];
  search: (searchTerm: string) => Promise<void>;
}

export const useSearchRecipes = (): UseSearchRecipesReturn => {
  const queryClient = useQueryClient();
  const [results, setResults] = useState<Recipe[]>([]);

  const search = async (searchTerm: string) => {
    // Get cached recipes or an empty array if none are cached
    const cachedRecipes: Recipe[] = queryClient.getQueryData(['recipes']) || [];

    // Filter cached recipes that include the search term
    const cachedResults = cachedRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Map to an array of UIDs to exclude from the server search
    const uidsToExclude = cachedResults.map((recipe) => recipe.uid);

    // Construct the query parameters
    const queryParams = new URLSearchParams({
      query: searchTerm,
      exclude: uidsToExclude.join(','),
    }).toString();

    // Fetch new results from the server, excluding cached UIDs
    const response = await fetch(`/api/search/recipes?${queryParams}`);
    const dbResults: Recipe[] = await response.json();

    // Combine results and update state
    setResults([...cachedResults, ...dbResults]);
  };

  // Return both results and the search function
  return { results, search };
};
