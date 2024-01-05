import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchContext } from '@contexts';
import { RecipeCard } from '../types/pages';
import { useHome } from './useHome.hook'; // Import useHome hook

export const useSearch = (searchTerm: string) => {
  const queryClient = useQueryClient();
  const { setResults } = useSearchContext();
  const { home } = useHome(); // Get home data including categories

  useEffect(() => {
    const allRecipes =
      queryClient.getQueryData<RecipeCard[]>(['recipeCards']) || [];
    const categories = home?.categories || [];

    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const searchTermLower = searchTerm.trim().toLowerCase();
    const filteredResults = allRecipes.filter((recipe) => {
      // Check if recipe name includes the search term
      const nameMatch = recipe.name?.toLowerCase().includes(searchTermLower);

      // Check if any category UID in the recipe matches a category from home.categories
      const categoryMatch = recipe.categories?.some((categoryUID) => {
        return categories.some(
          (homeCategory) =>
            homeCategory.uid === categoryUID &&
            homeCategory.name.toLowerCase().includes(searchTermLower),
        );
      });

      return nameMatch || categoryMatch;
    });

    setResults(filteredResults);
  }, [searchTerm, queryClient, setResults, home]);
};

export default useSearch;
