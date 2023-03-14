import Recipe from '../models/paprika.model.js';
import RecipeIds from '../models/recipeIds.model.js';
import * as middleware from '../middleware/paprika.middleware.js';
import mongoose from 'mongoose';

// export const getCategories = async (req, res) => res.send({ categories: await middleware.getCategories() });

// export const getRecipes = async (req, res) => ;

// export async function create() {
// 	const allRecipes = await middleware.allRecipes();
// 	// if (!recipe.uid) {
// 	// 	res.status(400).send({ message: 'Content can not be empty! ' });
// 	// 	return;
// 	// }

//* this will most likely be async when you finish with actual paprika api call.
// 	//Create a Recipe

export async function deleteAll(req, res) {
	const collections = mongoose.connection.collections;

	await Promise.all(
		Object.values(collections).map(async (collection) => {
			await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
		})
	);
}

export async function sendAllRecipes(req, res) {
	Recipe.find()
		.then((recipes) => {
			res.send({ recipes: recipes });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving tutorials.',
			});
		});
}

export async function storeRecipes(req, res) {
	const recipeIds = await middleware.paprikaRecipesIds();
	const recipes = await middleware.paprikaAllRecipes();

	Recipe.insertMany(recipes).then(() => {
		res.send({ recipes });
	});

	RecipeIds.insertMany(recipeIds);
}

export async function storeRecipe(req, res) {
	const recipe = await middleware.paprikaRecipe();

	Recipe.save(recipe);
}

export async function updateRecipes(req, res) {
	const paprikaIds = await middleware.paprikaRecipeIds();
	const dbIds = await RecipeIds.find().lean();

	const isEqualLength = paprikaIds.length === dbIds.length;

	const sendAllRecipes = () =>
		Recipe.find()
			.then((recipes) => {
				res.send({ recipes: recipes });
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || 'Some error occurred while retrieving tutorials.',
				});
			});

	if (!isEqualLength) {
		const newRecipeIds = paprikaIds.filter((paprikaId) => !dbIds.find((dbId) => paprikaId.uid === dbId.uid));
		const newUIds = newRecipeIds.filter((ids) => ids.uid);

		Recipe.collection.insertMany(await middleware.paprikaNewRecipes(newUIds));

		RecipeIds.collection.insertMany(newUIds);

		await sendAllRecipes();
	} else {
		await sendAllRecipes();
	}
}
