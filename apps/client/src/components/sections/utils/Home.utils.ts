import { Recipe } from '@prisma/client';
import { FeaturedCardData } from '@types';

const ingredientsCount = (ingredients: Recipe['ingredients']) =>
  ingredients.split('\n').length;

const buildRecipeLink = (name: Recipe['name']) =>
  `/recipes/${name.split(' ').join('-')}`;


export function processRecipeForCard(recipes: Recipe[]): FeaturedCardData[] {
  return recipes?.map((recipe) => {
    return {
      description: recipe.description,
      id: recipe.id,
      image_url: recipe.image_url,
      ingredientsCount: ingredientsCount(recipe.ingredients),
      name: recipe.name,
      prep_time: recipe.prep_time,
      recipeLink: buildRecipeLink(recipe.name),
    };
  });
}
