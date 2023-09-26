import { Recipe } from '@prisma/client';

export type Home = {
  favorites: Recipe[];
  recent: Recipe[];
};
