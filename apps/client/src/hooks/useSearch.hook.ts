import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchContext } from '@contexts';
import { RecipeCard } from '../types/pages';

export const useSearch = (searchTerm: string) => {
  const queryClient = useQueryClient();
  const { setResults } = useSearchContext();

  useEffect(() => {
    const allRecipes =
      queryClient.getQueryData<RecipeCard[]>(['recipeCards']) || [];

    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const searchTermLower = searchTerm.trim().toLowerCase();
    const filteredResults = allRecipes.filter((recipe) => {
      // Check if recipe name includes the search term
      const nameMatch = recipe.name?.toLowerCase().includes(searchTermLower);

      return nameMatch;
    });

    setResults(filteredResults);
  }, [searchTerm, queryClient, setResults]);
};

export default useSearch;
