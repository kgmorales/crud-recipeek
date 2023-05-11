import { Recipe } from '@core/interfaces';

export const buildRecipesModel = (recipes: Recipe[]) => {
  return recipes.map((recipe: Recipe) => {
    const directionsList = recipe.directions.split(/\r?\n/);
    const ingredientsList = recipe.ingredients.split(/\r?\n/);

    return { ...recipe, directionsList, ingredientsList };
  });
};
