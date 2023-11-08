import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@api/recipes/categories.routes';
import { fetchHome } from '@api/pages/home.routes';
import { addCategoryToRecipe } from '@clientUtils/addCategoryToRecipe';
import { useUpdateRecipeCache } from '@hooks';
import { useMemo } from 'react';
import { Home } from '@types';

export const useHome = () => {
  const { updateRecipeCache, retrieveRecipes } = useUpdateRecipeCache();

  const { data: categories, ...categoriesQueryInfo } = useQuery(
    ['categories'],
    fetchCategories,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  );

  const homeQueryKey = useMemo(
    () => ['home', categories ? { categories } : {}],
    [categories],
  );

  const selectFunction = useMemo(() => {
    return categories
      ? (home: Home) => {
          if (!home) return undefined; // Guard clause for undefined homeData
          return {
            favorites: addCategoryToRecipe(home.favorites, categories),
            recents: addCategoryToRecipe(home.recents, categories),
          };
        }
      : undefined;
  }, [categories]);

  // Retrieve initial recipes from cache or localStorage
  const initialRecipes = retrieveRecipes();

  const { data: home, ...homeQueryInfo } = useQuery(homeQueryKey, fetchHome, {
    initialData: initialRecipes.length
      ? { favorites: initialRecipes, recents: initialRecipes }
      : undefined,
    enabled: !!categories && !!selectFunction,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: selectFunction,
    onSuccess: (home) => {
      if (home) {
        // Combine and duplicate recipes from favorites and recents
        const newRecipes = [...new Set([...home.favorites, ...home.recents])];
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
