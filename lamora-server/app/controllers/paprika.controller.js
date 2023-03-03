import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { PaprikaApi } from 'paprika-api';

const paprika = new PaprikaApi(process.env.PAPRIKA_USER, process.env.PAPRIKA_PASS);

const allRecipes = async () => {
	const getRecipe = (uid) => paprika.recipe(uid).catch((err) => console.error(err));
	const recipeItems = await paprika.recipes();
	const allRecipes = await Promise.all(recipeItems.map(async (item) => await getRecipe(item.uid)));
	return allRecipes;
};

export const getAllRecipes = async (req, res) => res.send({ allRecipes: await allRecipes() });

// // Create and Save a new Tutorial
// export function create(req, res) {
// 	// Validate request
// 	if (!req.body.title) {
// 		res.status(400).send({ message: 'Content can not be empty!' });
// 		return;
// 	}

// 	// Create a Tutorial
// 	const recipe = new Paprika({
// 		title: req.body.title,
// 		description: req.body.description,
// 		published: req.body.published ? req.body.published : false,
// 	});

// 	// Save Tutorial in the database
// 	recipe
// 		.save(recipe)
// 		.then((data) => {
// 			res.send(data);
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: err.message || 'Some error occurred while creating the Tutorial.',
// 			});
// 		});
// }

// // Retrieve all Tutorials from the database.
// export function findAll(req, res) {
// 	const title = req.query.title;
// 	var condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};

// 	Recipe.find(condition)
// 		.then((data) => {
// 			res.send(data);
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: err.message || 'Some error occurred while retrieving tutorials.',
// 			});
// 		});
// }

// // Find a single Tutorial with an id
// export function findOne(req, res) {
// 	const id = req.params.id;

// 	Recipe.findById(id)
// 		.then((data) => {
// 			if (!data) res.status(404).send({ message: 'Not found Tutorial with id ' + id });
// 			else res.send(data);
// 		})
// 		.catch((err) => {
// 			res.status(500).send({ message: 'Error retrieving Tutorial with id=' + id });
// 		});
// }

// // Update a Tutorial by the id in the request
// export function update(req, res) {
// 	if (!req.body) {
// 		return res.status(400).send({
// 			message: 'Data to update can not be empty!',
// 		});
// 	}

// 	const id = req.params.id;

// 	Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
// 		.then((data) => {
// 			if (!data) {
// 				res.status(404).send({
// 					message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
// 				});
// 			} else res.send({ message: 'Tutorial was updated successfully.' });
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: 'Error updating Tutorial with id=' + id,
// 			});
// 		});
// }

// // Delete a Tutorial with the specified id in the request
// const _delete = (req, res) => {
// 	const id = req.params.id;

// 	Recipe.findByIdAndRemove(id, { useFindAndModify: false })
// 		.then((data) => {
// 			if (!data) {
// 				res.status(404).send({
// 					message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
// 				});
// 			} else {
// 				res.send({
// 					message: 'Tutorial was deleted successfully!',
// 				});
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: 'Could not delete Tutorial with id=' + id,
// 			});
// 		});
// };
// export { _delete as delete };

// // Delete all Tutorials from the database.
// export function deleteAll(req, res) {
// 	Recipe.deleteMany({})
// 		.then((data) => {
// 			res.send({
// 				message: `${data.deletedCount} Tutorials were deleted successfully!`,
// 			});
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: err.message || 'Some error occurred while removing all tutorials.',
// 			});
// 		});
// }

// // Find all published Tutorials
// export function findAllPublished(req, res) {
// 	Recipe.find({ published: true })
// 		.then((data) => {
// 			res.send(data);
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: err.message || 'Some error occurred while retrieving tutorials.',
// 			});
// 		});
// }
