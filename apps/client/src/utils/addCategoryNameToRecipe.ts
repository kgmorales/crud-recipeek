import { Recipe, Category } from '@prisma/client';

export const addCategoryToRecipe = (
  recipes: Recipe[],
  categories: Category[],
): Recipe[] => {
  const categoryMap = new Map(categories.map((cat) => [cat.uid, cat.name]));

  return recipes.map((recipe) => ({
    ...recipe,
    categories: recipe.categories.map(
      (catId) => categoryMap.get(catId) || catId,
    ),
  }));
};
