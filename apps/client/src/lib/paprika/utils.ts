import { Recipe, RecipeItem, Category } from '@prisma/client';
import * as paprikaApi from './api';

/**
 * Retrieve All Recipes From Paprika.
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  const recipeItems: RecipeItem[] = await paprikaApi.recipes();
  const recipeUids: string[] = recipeItems.map((item) => item.uid);

  const recipePromises: Promise<Recipe>[] = recipeUids.map((uid) =>
    paprikaApi.recipe(uid),
  );
  const recipes: Recipe[] = await Promise.all(recipePromises).catch((err) => {
    console.error(err);
    return [];
  });
  return recipes;
}

/**
 * Get all Categories from Paprika.
 */
export async function getCategories(): Promise<Category[]> {
  const categories = await paprikaApi.categories();
  return categories || [];
}

/**
 * Find recipes by array of recipe uid's as 1 string.
 * @param uids
 * @returns Promise<IRecipe[]>
 */
//* FIND BY UIDS
export async function findByUID(uids: string): Promise<Recipe[]> {
  const getRecipe = async (uid: string) => await paprikaApi.recipe(uid);

  const recipes = await Promise.all(
    uids.split(',').map((uid) => getRecipe(uid)),
  );

  return recipes || [];
}

/**
 * Find recipes by array of recipe uid's as 1 string.
 */
export async function getRecipesByUIDs(uids: string): Promise<Recipe[]> {
  const getRecipe = async (uid: string) => await paprikaApi.recipe(uid);

  const recipes = await Promise.all(
    uids.split(',').map((uid) => getRecipe(uid)),
  );

  return recipes || [];
}

/**
 * Get all recipe Item ID's.
 */
export async function getRecipeIds(): Promise<RecipeItem[]> {
  const ids = await paprikaApi.recipes();
  return ids || [];
}
