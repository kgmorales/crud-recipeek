import { Category } from '@prisma/client';
import { RecipeCard } from '../types/pages';

export const addCategoryToRecipe = (
  recipes: RecipeCard[],
  categories: Category[],
): RecipeCard[] => {
  const categoryMap = new Map(categories.map((cat) => [cat.uid, cat.name]));

  return recipes.map((recipe) => ({
    ...recipe,
    categories: recipe.categories?.map(
      (catId) => categoryMap.get(catId) || catId,
    ),
  }));
};
