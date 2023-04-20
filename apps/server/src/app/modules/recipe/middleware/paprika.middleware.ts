// // import { PaprikaApi } from 'paprika-api';
// // import config from '../../config/config';

// // const paprika = new PaprikaApi(config.PAPRIKA_USER as string, config.PAPRIKA_PASS as string);

// // //? FROM Paprika Recipes
// // export async function paprikaRecipesIds() {
// // 	return await paprika.recipes();
// // }

// export async function paprikaNewRecipes(uids: string[]) {
// 	const getRecipe = (uid: string) => paprika.recipe(uid).catch((err) => console.error(err));

// 	return await Promise.all(uids.map(async (uid: string) => await getRecipe(uid)));
// }

// export async function paprikaAllRecipes() {
// 	const getRecipe = (uid: string) => paprika.recipe(uid).catch((err) => console.error(err));
// 	const recipeItems = await paprikaRecipeIds();

// 	return await Promise.all(recipeItems.map(async (recipe) => await getRecipe(recipe.uid)));
// }

// // export async function paprikaCategories() {
// // 	return await paprika.categories();
// // }

// // export async function paprikaRecipe(uid: string) {
// // 	await paprika.recipe(uid);
// // }

// // export async function paprikaRecipeIds() {
// // 	return await paprika.recipes();
// // }

// // //? Fake data
// // // export function allRecipes() {
// // //  return recipes;
// // //}
