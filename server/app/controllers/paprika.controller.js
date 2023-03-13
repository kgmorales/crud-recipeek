import Recipe from '../models/paprika.model.js';
import * as middleware from '../middleware/paprika.middleware.js';

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
export const getRecipes = (req, res) => {
	// return middleware.allRecipes().map((recipe) => new Recipe(recipe).save());\
	const allRecipes = middleware.allRecipes();
	Recipe.insertMany(allRecipes).then((data) => {
		res.send({ recipes: allRecipes });
	});
};

export const showAllRecipes = (req, res) => {
	Recipe.find()
		.then((recipes) => {
			res.send({ recipes: recipes });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving tutorials.',
			});
		});
};

export const deleteAll = (req, res) => {
	Recipe.deleteMany({})
		.then((data) => {
			res.send({
				message: `${data.deletedCount} Recipes were deleted successfully!`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all recipes.',
			});
		});
};

export const findRecipeAndUpdate = (req, res) => {
	// let
};

// return middleware.allRecipes.map((recipe) => {
// 	recipe
// 		.save(recipe)
// 		.then((data) => {
//       res.send({ recipes: { data });
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: err.message || 'Error Occured',
// 			});
// 		});
// });
//}
// 	// .save(tutorial)
// 	// .then((data) => {
// 	// 	res.send(data);
// 	// })
// 	// .catch((err) => {
// 	// 	res.status(500).send({
// 	// 		message: err.message || 'Some error occurred while creating the Tutorial.',
// 	// 	});
// 	// });
// }
