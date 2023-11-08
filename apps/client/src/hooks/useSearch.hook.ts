// import { useState, useEffect, useMemo, useContext } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { Recipe } from '@prisma/client';
// import { SearchContext } from '@contexts';
// import { fetchSearchResults } from '../pages/api/search/search.routes';
// import { masterRecipesKey } from '@constants';
// import { useUpdateRecipeCache } from '@hooks';

// export const useSearch = (searchTerm: string) => {
//   const queryClient = useQueryClient();
//   const { updateRecipeCache } = useUpdateRecipeCache();
//   // const { setResults } = useContext(SearchContext);

//   // Get cached Recipes that have been saved into React Query.
//   const allCachedRecipes = useMemo(() => {
//     return queryClient.getQueryData<Recipe[]>([masterRecipesKey]) || [];
//   }, [queryClient]);

//   const cachedResults = useMemo(() => {
//     if (!searchTerm.trim()) return allCachedRecipes;
//     return allCachedRecipes.filter((recipe) =>
//       recipe.name.toLowerCase().includes(searchTerm.toLowerCase()),
//     );
//   }, [searchTerm, allCachedRecipes]);

//   const [combinedResults, setCombinedResults] = useState<Recipe[]>([]);

//   // Define the function to fetch search results, excluding cached ones.
//   const fetchExcludingCached = () => {
//     const excludedIds = cachedResults.map((recipe) => recipe.id);
//     return fetchSearchResults(searchTerm, excludedIds);
//   };

//   const searchQuery = useQuery({
//     queryKey: ['searchResults', searchTerm],
//     queryFn: fetchExcludingCached,
//   });

//   // Update cache and state when new data is fetched
//   // useEffect(() => {
//   //   if (searchQuery.data) {
//   //     updateRecipeCache(searchQuery.data);
//   //     const newResults = [...cachedResults, ...searchQuery.data];
//   //     setCombinedResults(newResults);
//   //     setResults(newResults);
//   //   }
//   // }, [searchQuery.data, cachedResults, updateRecipeCache, setResults]);

//   // // Clear results when the search term is cleared
//   // useEffect(() => {
//   //   if (searchTerm.trim() === '') {
//   //     setCombinedResults([]);
//   //     setResults([]);
//   //   }
//   // }, [searchTerm, setResults]);

//   return {
//     results: combinedResults,
//     isLoading: searchQuery.isLoading,
//     isError: searchQuery.isError,
//     error: searchQuery.error,
//   };
// };
