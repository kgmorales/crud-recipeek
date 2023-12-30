import { useQuery } from '@tanstack/react-query';
import fetchRecipe from '@api/recipes/recipe.routes';

export const useRecipe = (uid: string) => {
  const recipe = useQuery({
    queryKey: ['recipe', uid],
    queryFn: () => fetchRecipe(uid),
    enabled: !!uid,
  });

  return recipe;
};

export default useRecipe;
