import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCategories } from '@api/recipes/categories.routes';
import { fetchHome } from '@api/pages/home.routes';
import { addCategoryToRecipe } from '@clientUtils/addCategoryToRecipe';
import { useUpdateRecipeCache } from '@hooks';
import { useMemo } from 'react';
import { Home } from '../types/pages/home.types';

export const useHome = () => {
  const queryClient = useQueryClient();
  const { updateRecipeCache } = useUpdateRecipeCache();

  const { data: categories, ...categoriesQueryInfo } = useQuery(
    ['categories'],
    fetchCategories,
    {
      staleTime: Infinity,
    },
  );

  const homeQueryKey = useMemo(
    () => ['home', categories ? { categories } : {}],
    [categories],
  );

  const selectFunction = useMemo(() => {
    return categories
      ? (homeData: Home) => {
          if (!homeData) return undefined; // Guard clause for undefined homeData
          return {
            favorites: addCategoryToRecipe(homeData.favorites, categories),
            recents: addCategoryToRecipe(homeData.recents, categories),
          };
        }
      : undefined;
  }, [categories]);

  const { data: home, ...homeQueryInfo } = useQuery(homeQueryKey, fetchHome, {
    enabled: !!categories && !!selectFunction,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: selectFunction,
    onSuccess: (homeData) => {
      if (homeData) {
        // Guard clause for undefined homeData
        const newRecipes = [...homeData.favorites, ...homeData.recents];
        updateRecipeCache(newRecipes);
      }
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
