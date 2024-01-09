import { useQuery } from '@tanstack/react-query';
import fetchAllRecipeCards from '@api/recipes/allRecipeCards.routes';

export const useRecipeCards = () => {
  // Fetch home data, which includes categories
  const allRecipeCardsQuery = useQuery({
    queryKey: ['recipeCards'],
    queryFn: fetchAllRecipeCards,
  });

  return { recipes: allRecipeCardsQuery.data };
};

export default useRecipeCards;
