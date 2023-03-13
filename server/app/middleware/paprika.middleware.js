import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { PaprikaApi } from 'paprika-api';
import { recipes } from '../fakeData/recipes.js';

const paprika = new PaprikaApi(process.env.PAPRIKA_USER, process.env.PAPRIKA_PASS);

//? Real Paprika Recipes
// export const allRecipes = async () => {
// 	const getRecipe = (uid) => paprika.recipe(uid).catch((err) => console.error(err));
// 	const recipeItems = await paprika.recipes();
// 	const allRecipes = await Promise.all(recipeItems.map(async (item) => await getRecipe(item.uid)));
// 	return allRecipes;
// };

//* Fake data
export const allRecipes = () => recipes;

export const getCategories = async () => await paprika.categories();

export const getRecipe = async () => await paprika.recipe();
