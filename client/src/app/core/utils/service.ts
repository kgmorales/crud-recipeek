import { AllRecipes, Recipe } from '@core/models';

export const buildRecipesModel = (allRecipes: AllRecipes) => {
  return Object.values(allRecipes)[0].map((recipe: Recipe) => {
    const directionsList = recipe.directions.split(/\r?\n/);
    const ingredientsList = recipe.ingredients.split(/\r?\n/);

    return { ...recipe, directionsList, ingredientsList };
  });
};
