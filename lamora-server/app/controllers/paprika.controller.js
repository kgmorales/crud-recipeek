import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import * as middleware from '../middleware/paprika.middleware.js';

export const getCategories = async (req, res) => res.send({ categories: await middleware.getCategories() });

export const getRecipes = async (req, res) => res.send({ recipes: await middleware.allRecipes() });
