import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCategories } from '@api/recipes/categories.routes';
import { fetchHome } from '@api/pages/home.routes';
import { addCategoryToRecipe } from '@utils/addCategoryNameToRecipe';
import { Recipe } from '@prisma/client';

export const useHome = () => {
  const queryClient = useQueryClient();

  const { data: categories, ...categoriesQueryInfo } = useQuery(
    ['categories'],
    fetchCategories,
  );

  const { data: home, ...homeQueryInfo } = useQuery(['home'], fetchHome, {
    enabled: !!categories,
    select: (home) => {
      if (!categories) return home;

      return {
        favorites: addCategoryToRecipe(home.favorites, categories),
        recents: addCategoryToRecipe(home.recents, categories),
      };
    },
    onSuccess: (data) => {
      const combinedRecipes = combineLists(data.favorites, data.recents);
      queryClient.setQueryData(['allRecipes'], combinedRecipes);
    },
  });

  return {
    categories,
    home,
    ...categoriesQueryInfo,
    ...homeQueryInfo,
  };
};

const combineLists = (favorites: Recipe[], recents: Recipe[]) => {
  const combined = [...favorites, ...recents];

  const uniqueRecipes = [...new Set(combined.map((recipe) => recipe.id))].map(
    (id) => combined.find((recipe) => recipe.id === id),
  );
  return uniqueRecipes;
};
