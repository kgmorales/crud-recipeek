import express from 'express';

import * as recipeController from '../controllers/recipe.controller.js';

const router = express.Router();

router.get('/', (req, res) => res.status(200).json({ message: 'Serving paprika' }));

router.get('/deleteAll', recipeController.deleteAll);

router.get('/recipes', recipeController.updateRecipes);

router.get('/storeRecipes', recipeController.storeRecipes);

router.get('/updateRecipes', recipeController.updateRecipes);
// router.get('/categories', paprika.getCategories);

// // Retrieve all Tutorials
// router.get('/', paprika.findAll);

// // Retrieve all published Tutorials
// router.get('/published', tutorials.findAllPublished);

// // Retrieve a single Tutorial with id
// router.get('/:id', tutorials.findOne);

// // Update a Tutorial with id
// router.put('/:id', tutorials.update);

// // Delete a Tutorial with id
// router.delete('/:id', tutorials.delete);

// // Create a new Tutorial
// router.delete('/', tutorials.deleteAll);

export default router;
