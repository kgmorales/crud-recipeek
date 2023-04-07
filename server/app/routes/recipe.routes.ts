import express from 'express';

import * as recipeController from '../controllers/recipe.controller';

const router = express.Router();

router.get('/home', recipeController.updateRecipes);

router.get('/deleteAll', recipeController.deleteAll);

router.get('/storeRecipes', recipeController.storeRecipes);

router.get('/updateRecipes', recipeController.updateRecipes);

router.get('/categories', recipeController.updateCategories);

router.get('/scrapeRecipe', recipeController.getScrapedRecipe);

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
