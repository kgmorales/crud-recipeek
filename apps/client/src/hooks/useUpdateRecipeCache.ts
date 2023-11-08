// useUpdateRecipeCache.ts
import { useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@prisma/client';
import { masterRecipesKey } from '@constants/master-recipe-key';

export const useUpdateRecipeCache = () => {
  const queryClient = useQueryClient();

  // Check if the cache is stale
  const isCacheStale = (timestamp: number) => {
    // Define cache duration (e.g., 24 hours in milliseconds)
    const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours
    return new Date().getTime() - timestamp > cacheDuration;
  };

  // Function to get recipes from localStorage
  const getRecipesFromLocalStorage = (): Recipe[] => {
    const storedData = localStorage.getItem(masterRecipesKey);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData && parsedData.recipes && parsedData.timestamp) {
        if (!isCacheStale(parsedData.timestamp)) {
          return parsedData.recipes;
        }
      }
    }
    return [];
  };

  // Function to update the cache and localStorage
  const updateRecipeCache = (newRecipes: Recipe[]) => {
    // Update React Query Cache
    queryClient.setQueryData<Recipe[]>(
      [masterRecipesKey],
      (oldRecipes = []) => {
        const recipeMap = new Map(
          oldRecipes.map((recipe) => [recipe.id, recipe]),
        );
        newRecipes.forEach((recipe) => {
          recipeMap.set(recipe.id, recipe);
        });
        return Array.from(recipeMap.values());
      },
    );

    // Save to localStorage with timestamp
    const timestampedData = {
      recipes: newRecipes,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(masterRecipesKey, JSON.stringify(timestampedData));
  };

  // Function to retrieve recipes, checking cache first
  const retrieveRecipes = (): Recipe[] => {
    // Try to get recipes from localStorage first
    const localStoredRecipes = getRecipesFromLocalStorage();
    if (localStoredRecipes.length > 0) {
      return localStoredRecipes;
    }

    // If no recipes in localStorage or cache is stale, return empty array
    // This will trigger a fetch from the server
    return [];
  };

  return { updateRecipeCache, retrieveRecipes };
};
