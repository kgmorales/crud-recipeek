import { Recipe } from '@prisma/client';

const ingredientsCount = (ingredients: Recipe['ingredients']): number =>
  ingredients.split('\n').length;

const buildRecipeLink = (name: Recipe['name']) =>
  `/recipes/${name.split(' ').join('-')}`;

export function processRecipeForCard(recipes?: Recipe[]) {
  return recipes?.map((recipe) => {
    return {
      description: recipe.description,
      uid: recipe.uid,
      image_url: recipe.image_url,
      ingredientsCount: ingredientsCount(recipe.ingredients),
      name: recipe.name,
      prep_time: recipe.prep_time,
      recipeLink: buildRecipeLink(recipe.name),
    };
  });
}
