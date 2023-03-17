import Recipe from '../models/recipe.model';
import RecipeIds from '../models/recipeIds.model';
import Category from '../models/categories.model';
import * as middleware from '../middleware/paprika.middleware';
import mongoose from 'mongoose';
import { RequestHandler } from 'express';

import * as sharedTypes from '../../../shared/types';

// @ts-ignore
import { recipeScraper } from 'recipe-scraper';

export const deleteAll: RequestHandler = (req, res) => {
	const collections = mongoose.connection.collections;

	Promise.all(
		Object.values(collections).map(async (collection) => {
			await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
		})
	);
};

export const storeRecipes: RequestHandler = async (req, res) => {
	const recipeIds = await middleware.paprikaRecipesIds();
	const recipes = await middleware.paprikaAllRecipes();

	Recipe.insertMany(recipes).then(() => {
		res.send({ recipes });
	});

	RecipeIds.insertMany(recipeIds);
};

export const updateRecipes: RequestHandler = async (req, res) => {
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
		Recipe.collection.insertMany(newRecipes as sharedTypes.Recipe[]);
	}

	await sendAllRecipes();
};

export const updateCategories: RequestHandler = async (req, res) => {
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
};

export const scrapeRecipe: RequestHandler = async (req, res) => {
	let recipe = await recipeScraper(req.url);
	console.log(recipe);
};
