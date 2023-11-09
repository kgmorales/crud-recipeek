import { useContext, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@prisma/client';
import { fetchSearchResults } from '@api/search/search.routes'; // Adjust the import path as needed
import { SearchContext } from '@contexts'; // Adjust the import path as needed

export const useSearch = (searchTerm: string) => {
  const queryClient = useQueryClient();
  const { setResults } = useContext(SearchContext);

  // Memoize the query key for search results
  const searchResultsKey = useMemo(
    () => ['searchResults', searchTerm],
    [searchTerm],
  );

  // Define the function to fetch search results, excluding cached ones
  const fetchExcludingCached = async ({
    queryKey: [key, term],
  }: {
    queryKey: [string, string];
  }) => {
    // Retrieve excluded IDs from the cache
    const allRecipes =
      queryClient.getQueryData<Recipe[]>(['masterRecipes']) || [];
    const excludedIds = allRecipes.map((recipe) => recipe.id);
    // Fetch new search results excluding the cached IDs
    return fetchSearchResults(term, excludedIds);
  };

  // Use the useQuery hook with queryKey and queryFn
  const searchQuery = useQuery<Recipe[], Error>({
    queryKey: searchResultsKey,
    queryFn: fetchExcludingCached,
    enabled: searchTerm.trim() !== '', // Only run the query if the search term is not empty
    select: (newRecipes) => {
      // Combine cached and fetched recipes
      const cachedRecipes =
        queryClient.getQueryData<Recipe[]>(['masterRecipes']) || [];
      return [...cachedRecipes, ...newRecipes];
    },
    onSuccess: (newRecipes) => {
      // Update the cache with the new recipes
      updateRecipeCache(newRecipes);
      // Update the search context with the combined results
      setResults(newRecipes);
    },
  });

  return {
    results: searchQuery.data || [],
    isLoading: searchQuery.isLoading,
    isError: searchQuery.isError,
    error: searchQuery.error,
  };
};

export default useSearch;
