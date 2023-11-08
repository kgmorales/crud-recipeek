import { useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@prisma/client';
import { masterRecipesKey } from '@constants/master-recipe-key';

export const useUpdateRecipeCache = () => {
  const queryClient = useQueryClient();

  //* Function to check if the cache is stale
  const isCacheStale = (timestamp: number) => {
    const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours
    return new Date().getTime() - timestamp > cacheDuration;
  };

  //* Function to get recipes from localStorage
  const getRecipesFromLocalStorage = (): Recipe[] => {
    const storedRecipes = localStorage.getItem(masterRecipesKey);
    if (storedRecipes) {
      const parsedRecipes = JSON.parse(storedRecipes);
      if (parsedRecipes && parsedRecipes.recipes && parsedRecipes.timestamp) {
        if (!isCacheStale(parsedRecipes.timestamp)) {
          return parsedRecipes.recipes;
        }
      }
    }
    return [];
  };

  /**
   *This function updates the React Query cache and localStorage
   *
   * @param newRecipes - The new recipes to update the cache with
   */
  const updateRecipeCache = (newRecipes: Recipe[]) => {
    //? Update React Query Cache
    queryClient.setQueryData<Recipe[]>([masterRecipesKey], newRecipes);

    //* Save to localStorage with timestamp
    const timestampedData = {
      recipes: newRecipes,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(masterRecipesKey, JSON.stringify(timestampedData));
  };

  //* Retrieve recipes, checking React Query cache first, then localStorage if not stale.
  const retrieveRecipes = (): Recipe[] => {
    //? Check React Query Cache first
    const cachedRecipes = queryClient.getQueryData<Recipe[]>([
      masterRecipesKey,
    ]);

    if (cachedRecipes) return cachedRecipes;

    //? If not in React Query Cache, try to get recipes from localStorage
    const localStoredRecipes = getRecipesFromLocalStorage();
    if (localStoredRecipes.length) {
      //? Update React Query Cache with the recipes from localStorage
      queryClient.setQueryData<Recipe[]>(
        [masterRecipesKey],
        localStoredRecipes,
      );
      return localStoredRecipes;
    }

    //* If no recipes in localStorage or cache is stale, return empty array
    //* This will trigger a fetch from the server
    return [];
  };

  return { updateRecipeCache, retrieveRecipes };
};
