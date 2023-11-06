// useSearch.ts
import { useState, useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSearchResults } from '../pages/api/search/search.routes'; // Adjust the import path as necessary
import { masterRecipesKey } from '@constants/master-recipe-key'; // Adjust the import path as necessary
import { Recipe } from '@prisma/client';
import { useUpdateRecipeCache } from './useUpdateRecipeCache'; // Adjust the import path as necessary

const useSearch = (searchTerm: string) => {
  const queryClient = useQueryClient();
  const updateRecipeCache = useUpdateRecipeCache();

  // Memoize the retrieval of all cached recipes with a type assertion
  const allCachedRecipes = useMemo(() => {
    // Type assertion as Recipe[]
    return queryClient.getQueryData<Recipe[]>([masterRecipesKey]) || [];
  }, [queryClient]);

  // Memoize the filtered cached results
  const cachedResults = useMemo(() => {
    if (!searchTerm.trim()) return allCachedRecipes; // Return all if no search term
    return allCachedRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, allCachedRecipes]);

  // State to store combined results
  const [combinedResults, setCombinedResults] = useState<Recipe[]>([]);

  // Fetch search results with react-query
  const { data, isLoading, isError, error } = useQuery(
    ['searchResults', searchTerm],
    () =>
      fetchSearchResults(
        searchTerm,
        cachedResults.map((recipe) => recipe.uid),
      ),
    {
      keepPreviousData: true,
      enabled: searchTerm.trim() !== '',
      onSuccess: (newRecipes) => {
        // Update cache with new recipes
        updateRecipeCache(newRecipes);
      },
      onError: (err) => {
        // Handle errors, for example, by logging or setting an error state
        console.error('Error fetching search results:', err);
      },
    },
  );

  // Effect to combine results only after fetching is complete
  useEffect(() => {
    // Only update combined results if not loading and no error
    if (!isLoading && !isError) {
      setCombinedResults([...cachedResults, ...(data || [])]);
    }
  }, [isLoading, isError, cachedResults, data]);

  return { results: combinedResults, isLoading, isError, error };
};

export default useSearch;
