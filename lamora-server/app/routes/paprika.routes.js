import express from 'express';

import { getAllRecipes } from '../controllers/paprika.controller.js';

const router = express.Router();

router.get('/getRecipes', getAllRecipes);

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
