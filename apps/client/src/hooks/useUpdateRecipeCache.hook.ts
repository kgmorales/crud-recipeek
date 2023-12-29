import { useQueryClient } from '@tanstack/react-query';
import { masterRecipesKey } from '@constants';
import { RecipeCard } from '../types/pages';

export const useUpdateRecipeCache = () => {
  const queryClient = useQueryClient();

  const updateRecipeCache = (newRecipes: RecipeCard[]) => {
    // Retrieve existing recipes from the cache
    const existingRecipes = queryClient.getQueryData<RecipeCard[]>([
      masterRecipesKey,
    ]);

    // Create a new map with all existing recipes
    const recipeMap = new Map(
      existingRecipes?.map((recipe) => [recipe.uid, recipe]),
    );

    // Add new recipes to the map, which will replace any existing ones with the same ID
    newRecipes.forEach((recipe) => {
      recipeMap.set(recipe.uid, recipe);
    });

    // Convert the map back into an array
    const updatedRecipes = Array.from(recipeMap.values());

    // Update the cache with the new array
    queryClient.setQueryData<RecipeCard[]>([masterRecipesKey], updatedRecipes);
  };

  return { updateRecipeCache };
};
