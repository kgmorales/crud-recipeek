import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Post } from '../types/pages';

interface BlogPostContextType {
  currentPost: Post | null;
  setCurrentPost: (recipe: Post) => void;
}

export const BlogPostContext = createContext<BlogPostContextType | undefined>(
  undefined,
);

export const useBlogPostContext = () => {
  const context = useContext(BlogPostContext);
  if (context === undefined) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
};

export const BlogPostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  return (
    <BlogPostContext.Provider value={{ currentPost, setCurrentPost }}>
      {children}
    </BlogPostContext.Provider>
  );
};
