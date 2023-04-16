import { AllCategories, AllRecipes, Recipe } from '@core/models';

export const buildRecipesModel = (allRecipes: AllRecipes) => {
  return Object.values(allRecipes)[0].map((recipe: Recipe) => {
    const directionsList = recipe.directions.split(/\r?\n/);
    const ingredientsList = recipe.ingredients.split(/\r?\n/);

    return { ...recipe, directionsList, ingredientsList };
  });
};

export const buildCategoryModel = (allCategories: AllCategories) => {
  return Object.values(allCategories)[0];
};
