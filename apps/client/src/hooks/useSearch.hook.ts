import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@prisma/client';
import { fetchSearchResults } from '@api/search/search.routes';
import { useSearchContext } from '@contexts';
import { masterRecipesKey } from '../constants/master-recipe-key';
import { RecipeCard } from '../types/pages';

export const useSearch = (searchTerm: string) => {
  const queryClient = useQueryClient();
  const { setResults } = useSearchContext();

  // Memoize fetchNewSearchResults to prevent it from being recreated on every render
  const fetchNewSearchResults = useCallback(
    async (term: string) => {
      const allCachedRecipes =
        queryClient.getQueryData<RecipeCard[]>([masterRecipesKey]) || [];

      const excludedIds = allCachedRecipes.reduce((acc, curr) => {
        if (curr.uid && curr.name?.toLowerCase().includes(term.toLowerCase())) {
          return [...acc, curr.uid];
        }
        return acc;
      }, [] as string[]);

      return fetchSearchResults(term, excludedIds);
    },

    [queryClient],
  ); // searchTerm is a dependency now

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const updateResults = async () => {
      const serverRecipes = await fetchNewSearchResults(searchTerm);
      const allCachedRecipes =
        queryClient.getQueryData<RecipeCard[]>([masterRecipesKey]) || [];
      const cachedRecipesMatchingSearchTerm = allCachedRecipes.filter(
        (recipe) =>
          recipe.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      const combinedResults = [
        ...cachedRecipesMatchingSearchTerm,
        ...serverRecipes,
      ];
      setResults(combinedResults);

      if (serverRecipes.length > 0) {
        queryClient.setQueryData<RecipeCard[]>(
          [masterRecipesKey],
          (oldData = []) => {
            const recipesMap = new Map(
              [...oldData, ...serverRecipes].map((recipe) => [
                recipe.uid,
                recipe,
              ]),
            );
            return Array.from(recipesMap.values());
          },
        );
      }
    };

    updateResults();
  }, [searchTerm, setResults, queryClient, fetchNewSearchResults]); // Include fetchNewSearchResults here

  return {
    results: queryClient.getQueryData<Recipe[]>([masterRecipesKey]) || [],
    isLoading: false, // You can manage loading state as per your logic
    isError: false, // You can manage error state as per your logic
    error: null, // You can manage error state as per your logic
  };
};

export default useSearch;
