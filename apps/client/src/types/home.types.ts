import { Recipe } from '@prisma/client';

export type Home = {
  categoryNames: string[];
  favorites: Recipe[];
  recent: Recipe[];
};
