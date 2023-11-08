import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@api/recipes/categories.routes';
import { fetchHome } from '@api/pages/home.routes';
import { addCategoryToRecipe } from '@clientUtils/addCategoryToRecipe';
import { useMemo } from 'react';
import { Home } from '../types/pages/home.types';
import { useUpdateRecipeCache } from '@hooks';

export const useHome = () => {
  // Use the custom hook to get the update cache function
  const { updateRecipeCache } = useUpdateRecipeCache();

  // Query for categories
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Destructure data and other query info from the categories query
  const { data: categories } = categoriesQuery;

  // Memoize the query key for the home data
  const homeQueryKey = useMemo(
    () => ['home', categories ? { categories } : undefined],
    [categories],
  );

  // Memoize the select function to transform the data
  const addCategoryMutation = useMemo(() => {
    return categories
      ? (data: Home) => {
          return {
            favorites: addCategoryToRecipe(data.favorites, categories),
            recents: addCategoryToRecipe(data.recents, categories),
          };
        }
      : undefined;
  }, [categories]);

  // Query for home data
  const homeQuery = useQuery({
    queryKey: homeQueryKey,
    queryFn: fetchHome,
    select: addCategoryMutation,
  });

  if (homeQuery.data) {
    const { favorites, recents } = homeQuery.data;
    updateRecipeCache([...favorites, ...recents]);
  }

  // Return the data and query information
  return {
    categories: categoriesQuery.data,
    home: homeQuery.data,
    ...homeQuery,
    ...categoriesQuery,
  };
};

export default useHome;
