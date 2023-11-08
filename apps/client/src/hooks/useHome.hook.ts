import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@api/recipes/categories.routes';
import { fetchHome } from '@api/pages/home.routes';
import { addCategoryToRecipe } from '@clientUtils/addCategoryToRecipe';
import { Home } from '@types';

export const useHome = () => {
  // Fetch categories with React Query's useQuery hook
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Destructure data and other query info from the categories query
  const { data: categories, ...categoriesQueryInfo } = categoriesQuery;

  // Memoize the query key for the home data
  const homeQueryKey = useMemo(
    () => ['home', categories ? { categories } : {}],
    [categories],
  );

  // Memoize the select function to transform the data
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

  // Fetch home data with React Query's useQuery hook
  const homeQuery = useQuery({
    queryKey: homeQueryKey,
    queryFn: fetchHome,
    enabled: !!categories && !!selectFunction,
    select: selectFunction,
  });

  // Destructure data and other query info from the home query
  const { data: home, ...homeQueryInfo } = homeQuery;

  // Return the data and query information
  return {
    categories,
    home,
    ...categoriesQueryInfo,
    ...homeQueryInfo,
  };
};

export default useHome;
