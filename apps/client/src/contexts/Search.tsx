import React, { createContext, useState, useContext } from 'react';
import { Recipe } from '@prisma/client';

// Define the context type for TypeScript
interface SearchContextType {
  results: Recipe[];
  setResults: (results: Recipe[]) => void;
}

// Create a context with a default value
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Define a provider component for the context
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [results, setResults] = useState<Recipe[]>([]);

  // The value to pass to the provider includes both the state and the updater function
  const value = { results, setResults };

  console.log({ value });
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

// Hook to use the search context
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

// Export the context itself in case it needs to be accessed directly
export { SearchContext };
