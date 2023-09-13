import { z } from 'zod';

const RecipeSchema = z.object({
  categories: z.array(z.string()),
  cook_time: z.string(),
  created: z.string(),
  deleted: z.boolean(),
  difficulty: z.string(),
  directions: z.string(),
  hash: z.string(),
  image_url: z.string().optional(),
  ingredients: z.string(),
  name: z.string(),
  notes: z.string().optional(),
  nutritional_info: z.string(),
  on_favorites: z.boolean(),
  photo: z.string().optional(),
  photo_hash: z.string().optional(),
  photo_url: z.string().optional(),
  prep_time: z.string(),
  rating: z.number().int(),
  scale: z.string(),
  servings: z.string(),
  source: z.string(),
  source_url: z.string().optional(),
  uid: z.string(),
});

export { RecipeSchema };
