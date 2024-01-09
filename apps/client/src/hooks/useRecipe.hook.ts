import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { RecipeCard } from '../types/pages';

export const useRecipe = (uid: string) => {
  const queryClient = useQueryClient();
  const [recipe, setRecipe] = useState<RecipeCard | undefined>(undefined);

  useEffect(() => {
    const allRecipes =
      queryClient.getQueryData<RecipeCard[]>(['recipeCards']) || [];

    const foundRecipe = allRecipes.find((recipe) => recipe.uid === uid);
    setRecipe(foundRecipe);
  }, [uid, queryClient]);

  return recipe;
};
