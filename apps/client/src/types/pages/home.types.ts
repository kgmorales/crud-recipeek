import { Recipe } from '@prisma/client';

export type Home = {
  favorites: Recipe[];
  recents: Recipe[];
};

export type FeaturedCardData = {
  description?: Recipe['description'];
  id?: Recipe['uid'];
  image_url?: Recipe['image_url'];
  ingredientsCount?: number;
  name?: Recipe['name'];
  prep_time?: Recipe['prep_time'];
  recipeLink?: string;
};
