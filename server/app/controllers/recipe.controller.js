import Recipe from '../models/recipe.model.js';
import RecipeIds from '../models/recipeIds.model.js';
import Category from '../models/categories.model.js';
import * as middleware from '../middleware/paprika.middleware.js';
import mongoose from 'mongoose';

export async function deleteAll(req, res) {
	const collections = mongoose.connection.collections;

	await Promise.all(
		Object.values(collections).map(async (collection) => {
			await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
		})
	);
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
	const dbRecipeCount = await Recipe.count();

	const sendAllRecipes = () =>
		Recipe.find()
			.then((recipes) => {
				res.send({ recipes });
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || 'Some error occurred while retrieving tutorials.',
				});
			});

	if (paprikaIds.length !== dbRecipeCount) {
		const dbIds = await RecipeIds.find().lean();
		const newRecipeIds = paprikaIds.filter((paprikaId) => !dbIds.find((dbId) => paprikaId.uid === dbId.uid));
		const newUIds = newRecipeIds.map((ids) => ids.uid);
		const newRecipes = await middleware.paprikaNewRecipes(newUIds);

		RecipeIds.collection.insertMany(newRecipeIds);
		Recipe.collection.insertMany(newRecipes);
	}

	await sendAllRecipes();
}

export async function updateCategories(req, res) {
	const paprikaCategories = await middleware.paprikaCategories();
	const dbCategoriesCount = await Category.count();

	const sendAllCategories = () =>
		Category.find()
			.then((categories) => {
				res.send({ categories });
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || 'Some error occurred while retrieving tutorials.',
				});
			});

	if (paprikaCategories.length !== dbCategoriesCount) {
		const dbCategories = await Category.find().lean();
		const newCategories = paprikaCategories.filter((paprikaId) => !dbCategories.find((dbId) => paprikaId.uid === dbId.uid));

		Category.collection.insertMany(newCategories);
	}
	await sendAllCategories();
}
