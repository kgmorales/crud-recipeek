import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@api/recipes/categories.routes';
import { fetchHome } from '@api/pages/home.routes';
import { addCategoryToRecipe } from '@clientUtils/addCategoryToRecipe';
import { useUpdateRecipeCache } from '@hooks/useUpdateRecipeCache';

export const useHome = () => {
  const updateRecipeCache = useUpdateRecipeCache();
  const { data: categories, ...categoriesQueryInfo } = useQuery(
    ['categories'],
    fetchCategories,
  );

  const { data: home, ...homeQueryInfo } = useQuery(['home'], fetchHome, {
    enabled: !!categories,
    select: (homeData) => {
      if (!categories) return homeData;

      return {
        favorites: addCategoryToRecipe(homeData.favorites, categories),
        recents: addCategoryToRecipe(homeData.recents, categories),
      };
    },
    onSuccess: (homeData) => {
      // Use the hook to update the cache with new recipes
      updateRecipeCache([...homeData.favorites, ...homeData.recents]);
    },
  });

  return {
    categories,
    home,
    ...categoriesQueryInfo,
    ...homeQueryInfo,
  };
};

export default useHome;
