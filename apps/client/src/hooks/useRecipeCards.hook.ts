import { useQuery } from '@tanstack/react-query';
import fetchAllRecipeCards from '@api/recipes/allRecipeCards.routes';

export const useRecipeCards = (isHomeLoaded: boolean) => {
  // Fetch home data, which includes categories
  const allRecipeCardsQuery = useQuery({
    queryKey: ['recipeCards'],
    queryFn: fetchAllRecipeCards,
    enabled: isHomeLoaded,
  });

  return { allRecipeCards: allRecipeCardsQuery.data };
};

export default useRecipeCards;
