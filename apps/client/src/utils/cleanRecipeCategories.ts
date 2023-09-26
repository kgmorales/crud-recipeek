import { Category, Recipe } from '@prisma/client';

export async function addCategoryStringToRecipes(
  recipes: Recipe[],
  categories: Category[],
): Promise<Recipe[]> {
  const categoryMap = new Map(categories.map((cat) => [cat.uid, cat.name]));

  const processedRecipes: Recipe[] = recipes.map((recipe) => ({
    ...recipe,
    categories: recipe.categories.map(
      (catId) => categoryMap.get(catId) || catId,
    ),
  }));

  return processedRecipes;
}
