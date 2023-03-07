import express from 'express';

import * as paprika from '../controllers/paprika.controller.js';

const router = express.Router();

router.get('/recipes', paprika.getRecipes);

// router.get('/categories', paprika.getCategories);

// router.get('/groceries', paprika.getGroceries);

// router.get('/recipe', paprika.getRecipe);

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
