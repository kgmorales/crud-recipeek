// useSearchRecipes.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSearchResults } from '@api/search/search.routes'; // Update with the correct path
import { masterRecipesKey } from '@constants/master-recipe-key'; // Ensure this is the correct path to your constant
import { Recipe } from '@prisma/client';

export const useSearchRecipes = (searchTerm: string) => {
  const queryClient = useQueryClient();

  // Get cached recipes or an empty array if none are cached
  const cachedRecipes: Recipe[] =
    queryClient.getQueryData([masterRecipesKey]) || [];

  // Filter cached recipes that include the search term
  const cachedResults = cachedRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  // Map to an array of UIDs to exclude from the server search
  const uidsToExclude = cachedResults.map((recipe) => recipe.uid);

  // Use the useQuery hook to fetch search results
  const { data, isLoading, isError, error } = useQuery(
    ['searchResults', searchTerm, uidsToExclude],
    () => fetchSearchResults(searchTerm, uidsToExclude),
    {
      // This option will keep the previous data while fetching new data
      keepPreviousData: true,
      // Only execute the query if the searchTerm is not empty
      enabled: searchTerm.trim() !== '',
    },
  );

  // Combine cached results with fetched results
  const results = [...cachedResults, ...(data || [])];

  return { results, isLoading, isError, error };
};
