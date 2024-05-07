import { Recipe } from '@prisma/client';

export type RecipeCard = {
  categories?: Recipe['categories'];
  cookTime?: Recipe['cook_time'];
  created?: Recipe['created'];
  description?: Recipe['description'];
  directions?: Recipe['directions'];
  ingredients?: Recipe['ingredients'];
  ingredientsCount?: number;
  imageURL?: Recipe['image_url'];
  isFavorite?: Recipe['on_favorites'];
  name?: Recipe['name'];
  notes?: Recipe['notes'];
  prepTime?: Recipe['prep_time'];
  recipeLink?: string;
  uid?: Recipe['uid'];
};
