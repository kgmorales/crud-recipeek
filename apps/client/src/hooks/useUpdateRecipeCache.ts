// useUpdateRecipeCache.ts
import { useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@prisma/client';
import { masterRecipesKey } from '@constants/master-recipe-key';

export const useUpdateRecipeCache = () => {
  const queryClient = useQueryClient();

  const updateRecipeCache = (newRecipes: Recipe[]) => {
    queryClient.setQueryData<Recipe[]>(
      [masterRecipesKey],
      (oldRecipes = []) => {
        // Create a map to keep track of recipes by id to avoid duplicates
        const recipeMap = new Map(
          oldRecipes.map((recipe) => [recipe.id, recipe]),
        );

        // Add new recipes to the map, which will replace any duplicates
        newRecipes.forEach((recipe) => {
          recipeMap.set(recipe.id, recipe);
        });

        // Convert the map back to an array
        const recipeList = Array.from(recipeMap.values());

        return recipeList;
      },
    );
  };

  return updateRecipeCache;
};
