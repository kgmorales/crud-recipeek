import React, { createContext, useState, ReactNode } from 'react';
import { Recipe } from '@prisma/client';

interface SearchContextType {
  results: Recipe[];
  setResults: (results: Recipe[]) => void;
}

const defaultState: SearchContextType = {
  results: [],
  setResults: () => {},
};

export const SearchContext = createContext<SearchContextType>(defaultState);

// Define a type for the props that the SearchProvider will accept
interface SearchProviderProps {
  children: ReactNode; // This defines the type for 'children'
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [results, setResults] = useState<Recipe[]>([]);

  return (
    <SearchContext.Provider value={{ results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
};

//* Hook to use the search context
export const useSearchContext = () => {
  const context = React.useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
