import { spawn } from 'child_process';
import { Recipe } from '../../../../shared/types';
import { ScrapedRecipe } from './types/scraped';
import { cleanScrapedRecipe } from '../../utils/scrapeCleaner';
import { cleanScrapedKeys } from '../../constants/scrapeToRecipe';

import { emptyRecipe } from '../../constants/recipe';

export async function scrapeRecipe(recipeUrl: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const python = spawn('python3', ['app/utils/scrape.py', recipeUrl]);

		python.stdout.on('data', (data) => {
			resolve(data.toString());
		});

		python.stderr.on('data', (data) => {
			reject(`stderr: ${data}`);
		});
	});
}

export async function setScrapeToRecipeModel(scrapedRecipe: ScrapedRecipe): Promise<Recipe> {
	const cleanScraped = cleanScrapedRecipe(cleanScrapedKeys, scrapedRecipe);

	const ingredients = Object.entries(cleanScraped.ingredients).join('\n');
	const nutritional_info = Object.entries(cleanScraped.nutritional_info).join('\n');
	const servings = Number(cleanScraped.servings.replace(/\D/g, ''));
	const categories: string[] = [];

	const prettyRecipeData = { ...cleanScraped, categories, ingredients, nutritional_info, servings };

	const newRecipe = { ...emptyRecipe, ...prettyRecipeData };

	const { author, host, instructions_list, language, ...recipe } = newRecipe;

	return recipe;
}
