import { useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@prisma/client';
import { masterRecipesKey } from '@constants/master-recipe-key';

export const useUpdateRecipeCache = () => {
  const queryClient = useQueryClient();

  // Function to check if the cache is stale
  const isCacheStale = (timestamp: number) => {
    const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours
    return new Date().getTime() - timestamp > cacheDuration;
  };

  // Function to get recipes from localStorage
  const getRecipesFromLocalStorage = (): Recipe[] => {
    // Ensure we're running in a browser environment with access to localStorage
    if (typeof window === 'undefined') {
      return [];
    }

    const storedRecipes = window.localStorage.getItem(masterRecipesKey);
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

  // This function updates the React Query cache and localStorage
  const updateRecipeCache = (newRecipes: Recipe[]) => {
    // Ensure we're running in a browser environment with access to localStorage
    if (typeof window === 'undefined') {
      return;
    }

    // Retrieve existing recipes from local storage
    const existingRecipes = getRecipesFromLocalStorage();

    // Create a map of existing recipe IDs for quick lookup
    const existingRecipeMap = new Map(
      existingRecipes.map((recipe) => [recipe.id, recipe]),
    );

    // Filter out new recipes that are already in the existing map
    const uniqueNewRecipes = newRecipes.filter(
      (recipe) => !existingRecipeMap.has(recipe.id),
    );

    // Merge unique new recipes with existing ones
    const mergedRecipes = [...existingRecipes, ...uniqueNewRecipes];

    // Save merged recipes to React Query Cache
    queryClient.setQueryData<Recipe[]>([masterRecipesKey], mergedRecipes);

    // Save merged recipes to localStorage with new timestamp
    const timestampedData = {
      recipes: mergedRecipes,
      recipeLength: mergedRecipes.length,
      timestamp: new Date().getTime(),
    };
    window.localStorage.setItem(
      masterRecipesKey,
      JSON.stringify(timestampedData),
    );
  };

  // Retrieve recipes, checking React Query cache first, then localStorage if not stale.
  const retrieveRecipes = (): Recipe[] => {
    // Check React Query Cache first
    const cachedRecipes = queryClient.getQueryData<Recipe[]>([
      masterRecipesKey,
    ]);

    if (cachedRecipes) {
      return cachedRecipes;
    }

    // If not in React Query Cache, try to get recipes from localStorage
    const localStoredRecipes = getRecipesFromLocalStorage();
    if (localStoredRecipes.length) {
      // Update React Query Cache with the recipes from localStorage
      queryClient.setQueryData<Recipe[]>(
        [masterRecipesKey],
        localStoredRecipes,
      );
      return localStoredRecipes;
    }

    // If no recipes in localStorage or cache is stale, return empty array
    // This will trigger a fetch from the server
    return [];
  };

  return { updateRecipeCache, retrieveRecipes };
};
