import { useCallback } from 'react';
import { useSearchContext } from '@contexts';

export const useUpdateSearchTerm = () => {
  const { setSearchTerm } = useSearchContext();

  const updateSearchTerm = useCallback(
    (newTerm: string) => {
      setSearchTerm(newTerm.trim()); // Set the new search term, trimming any whitespace
      window.scrollTo(0, 0); // Optionally scroll to the top of the page
    },
    [setSearchTerm],
  );

  return updateSearchTerm;
};
