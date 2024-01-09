import { Category, Recipe } from '@prisma/client';
import { RecipeCard } from '@server/types/recipe-card.types';

const ingredientsCount = (ingredients: Recipe['ingredients']): number =>
  ingredients.split('\n').length;

const buildRecipeLink = (name: Recipe['name']) =>
  `/recipes/${name.split(' ').join('-')}`;

const addCategoryToRecipe = (
  recipeCategories: string[],
  categories: Category[],
) => {
  const categoryMap = new Map(categories.map((cat) => [cat.uid, cat.name]));

  return recipeCategories.map((catUID) => {
    return categoryMap.get(catUID) || '';
  });
};

export function reduceRecipeData(
  recipes: Recipe[],
  categories: Category[],
): RecipeCard[] {
  return recipes.map((recipe) => {
    return {
      categories: addCategoryToRecipe(recipe.categories, categories),
      cookTime: recipe.cook_time,
      created: recipe.created,
      description: recipe.description,
      directions: recipe.directions,
      ingredientsCount: ingredientsCount(recipe.ingredients),
      ingredients: recipe.ingredients,
      imageURL: recipe.photo_url,
      isFavorite: recipe.on_favorites,
      name: recipe.name,
      notes: recipe.notes,
      prepTime: recipe.prep_time,
      recipeLink: buildRecipeLink(recipe.name),
      uid: recipe.uid,
    };
  });
}
