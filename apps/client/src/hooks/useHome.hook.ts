import { useQuery } from '@tanstack/react-query';
import { fetchHome } from '@api/pages/home.routes';
import { addCategoryToRecipe } from '@clientUtils/addCategoryToRecipe';
import { useEffect } from 'react';
import { Home } from '../types/pages/home.types';
import { useUpdateRecipeCache } from '@hooks';

export const useHome = () => {
  const { updateRecipeCache } = useUpdateRecipeCache();

  // Fetch home data, which includes categories
  const homeQuery = useQuery({
    queryKey: ['home'],
    queryFn: fetchHome,
    select: (data: Home) => {
      // Extract categories from the fetched data
      const categories = data.categories;

      // Transform the favorites and recents by adding categories to each recipe
      const transformedData = {
        favorites: addCategoryToRecipe(data.favorites, categories),
        recents: addCategoryToRecipe(data.recents, categories),
      };

      return transformedData;
    },
  });

  // Effect to update the recipe cache when new home data is fetched
  useEffect(() => {
    if (homeQuery.data) {
      const { favorites, recents } = homeQuery.data;
      const newRecipes = [...favorites, ...recents];
      updateRecipeCache(newRecipes);
    }
  }, [homeQuery.data, updateRecipeCache]);

  // Returning only the transformed favorites and recents data
  return {
    home: homeQuery.data,
    ...homeQuery,
  };
};

export default useHome;
