import { Category, CategorySchema } from './categories.schema';
import { PaprikaToken, PaprikaTokenSchema } from './paprika-token.schema';
import { Recipe, RecipeSchema } from './recipe.schema';
import { RecipeIds, RecipeIdsSchema } from './recipeIds.schema';

export const schema = {
  Category,
  CategorySchema,
  PaprikaToken,
  PaprikaTokenSchema,
  Recipe,
  RecipeSchema,
  RecipeIds,
  RecipeIdsSchema,
};

export * from './categories.schema';
export * from './paprika-token.schema';
export * from './recipe.schema';
export * from './recipeIds.schema';
