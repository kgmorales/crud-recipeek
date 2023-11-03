// useSearchRecipes.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSearchResults } from '@api/search/search.routes'; // Update with the correct path
import { masterRecipesKey } from '@constants/master-recipe-key'; // Ensure this is the correct path to your constant
import { Recipe } from '@prisma/client';

export const useSearchRecipes = (searchTerm: string) => {
  const queryClient = useQueryClient();

  // Immediately return an empty array if the search term is blank
  if (searchTerm.trim() === '') {
    return { results: [], isLoading: false, isError: false, error: null };
  }

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
      keepPreviousData: true,
      onSuccess: (newData) => {
        // Update the master cache with the new data
        queryClient.setQueryData([masterRecipesKey], (oldData) => {
          // Cast oldData to the correct type
          const existingData = oldData as Recipe[] | undefined;
          // Combine existing data with the new data, avoiding duplicates
          const combinedData = existingData
            ? [...existingData, ...newData]
            : newData;
          // Remove duplicates, if any, based on the unique identifier (uid)
          const uniqueData = Array.from(
            new Map(combinedData.map((item) => [item.uid, item])).values(),
          );
          return uniqueData;
        });
      },
    },
  );

  // Combine cached results with fetched results
  const results = [...cachedResults, ...(data || [])];

  return { results, isLoading, isError, error };
};
