import { Recipe } from '@prisma/client';

export type RecipeCard = {
  description?: Recipe['description'];
  uid?: Recipe['uid'];
  image_url?: Recipe['image_url'];
  ingredientsCount?: number;
  name?: Recipe['name'];
  prep_time?: Recipe['prep_time'];
  recipeLink?: string;
};
