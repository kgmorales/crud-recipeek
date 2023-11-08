import { useState, useEffect, useMemo, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@prisma/client';
import { SearchContext } from '@contexts';
import { fetchSearchResults } from '../pages/api/search/search.routes';
import { masterRecipesKey } from '@constants/master-recipe-key';
import { useUpdateRecipeCache } from '@hooks';

export const useSearch = (searchTerm: string) => {
  const queryClient = useQueryClient();
  const updateRecipeCache = useUpdateRecipeCache();
  const { setResults } = useContext(SearchContext);

  //* Get cached Recipes that have been saved into React Query.
  const allCachedRecipes = useMemo(() => {
    return queryClient.getQueryData<Recipe[]>([masterRecipesKey]) || [];
  }, [queryClient]);

  const cachedResults = useMemo(() => {
    if (!searchTerm.trim()) return allCachedRecipes;
    return allCachedRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, allCachedRecipes]);

  const [combinedResults, setCombinedResults] = useState<Recipe[]>([]);

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
        updateRecipeCache(newRecipes);
      },
      onError: (err) => {
        console.error('Error fetching search results:', err);
      },
    },
  );

  useEffect(() => {
    if (!isLoading && !isError) {
      const newResults = [...cachedResults, ...(data || [])];
      setCombinedResults(newResults);
      setResults(newResults);
    }
  }, [isLoading, isError, cachedResults, data, setResults]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setCombinedResults([]);
      setResults([]);
    }
  }, [searchTerm, setResults]);

  return { results: combinedResults, isLoading, isError, error };
};
