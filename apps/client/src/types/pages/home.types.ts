import { Recipe } from '@prisma/client';

export type Home = {
  favorites: Recipe[];
  recents: Recipe[];
};
