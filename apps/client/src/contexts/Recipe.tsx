// context/RecipeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { RecipeCard } from '../types/pages';

interface RecipeContextType {
  currentRecipe: RecipeCard | null;
  setCurrentRecipe: (recipe: RecipeCard) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentRecipe, setCurrentRecipe] = useState<RecipeCard | null>(null);

  return (
    <RecipeContext.Provider value={{ currentRecipe, setCurrentRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
