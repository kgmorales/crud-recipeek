import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@prisma/client';
import { fetchSearchResults } from '@api/search/search.routes'; // Adjust the import path as needed
import { useSearchContext } from '@contexts'; // Adjust the import path as needed
import { masterRecipesKey } from '../constants/master-recipe-key';

export const useSearch = (searchTerm: string) => {
  const queryClient = useQueryClient();
  const { setResults } = useSearchContext();

  // Define the function to fetch search results, excluding cached ones
  const fetchExcludingCached = async () => {
    // Retrieve excluded IDs from the cache
    const allRecipes =
      queryClient.getQueryData<Recipe[]>([masterRecipesKey]) || [];
    const excludedIds = allRecipes.map((recipe) => recipe.uid);
    // Fetch new search results excluding the cached IDs
    return fetchSearchResults(searchTerm, excludedIds);
  };

  // Use the useQuery hook with queryKey and queryFn
  const { data, isLoading, isError, error } = useQuery<Recipe[], Error>({
    queryKey: ['searchResults', searchTerm],
    queryFn: fetchExcludingCached,
    enabled: searchTerm.trim() !== '', // Only run the query if the search term is not empty
  });

  // Update the search context when data changes
  useEffect(() => {
    if (data) {
      // Filter the fetched data with the search term to avoid adding unrelated recipes
      const filteredData = data.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      // Update the search context with the filtered results
      setResults(filteredData);
    }
  }, [data, searchTerm, setResults]);

  return {
    results: data || [],
    isLoading,
    isError,
    error,
  };
};

export default useSearch;
