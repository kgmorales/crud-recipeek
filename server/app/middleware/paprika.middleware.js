import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { PaprikaApi } from 'paprika-api';
// import { recipes } from '../fakeData/recipes.js';

const paprika = new PaprikaApi(process.env.PAPRIKA_USER, process.env.PAPRIKA_PASS);

//? FROM Paprika Recipes
export async function paprikaRecipesIds() {
	return await paprika.recipes();
}

export async function paprikaNewRecipes(uids) {
	console.log({ uids });
	const getRecipe = (uid) => paprika.recipe(uid).catch((err) => console.error(err));

	return await Promise.all(uids.map(async (uid) => await getRecipe(uid)));
}

export async function paprikaAllRecipes() {
	const getRecipe = (uid) => paprika.recipe(uid).catch((err) => console.error(err));
	const recipeItems = await paprikaRecipeIds();

	return await Promise.all(recipeItems.map(async (recipe) => await getRecipe(recipe.uid)));
}

export async function paprikaCategories() {
	return await paprika.categories();
}

export async function paprikaRecipe(uid) {
	await paprika.recipe(uid);
}

export async function paprikaRecipeIds() {
	return await paprika.recipes();
}

//? Fake data
// export function allRecipes() {
//  return recipes;
//}
