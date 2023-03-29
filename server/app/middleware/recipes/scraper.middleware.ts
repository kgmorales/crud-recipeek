import { spawn } from 'child_process';
import { Recipe } from '../../../../shared/types';

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

export async function setScrapeToRecipeModel(scrapedRecipe: Partial<Recipe>): Promise<Recipe> {
	const newRecipe = { ...emptyRecipe, ...scrapedRecipe };

	const { nutritional_info } = newRecipe;

	const cleanNutritionInfo = Object.entries(nutritional_info).join('\n');

	return { ...newRecipe, nutritional_info: cleanNutritionInfo };
}
