import { spawn } from 'child_process';
import { Recipe } from '../../../../shared/types';
import { ScrapedRecipe } from './types/scraped';
import { cleanScrapedRecipe } from '../../utils/scrapeCleaner';
import { matchPaprikaKeys } from '../../constants/scrapeToRecipe';

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
	const isEmpty = (obj: Record<string, string>) => Object.keys(obj).length === 0;
	const joinObjectToString = (data: Record<string, string>) => Object.entries(data).join('\n');
	const cleanScraped = cleanScrapedRecipe(matchPaprikaKeys, scrapedRecipe);

	const categories: string[] = [];
	const ingredients = cleanScraped.instructions_list.length === 0 ? '' : cleanScraped.instructions_list.join('\n');
	const nutritional_info = isEmpty(cleanScraped.nutritional_info) && joinObjectToString(cleanScraped.nutritional_info);
	const servings = Number(cleanScraped.servings.replace(/\D/g, ''));

	const prettyRecipeData = {
		...cleanScraped,
		categories,
		ingredients,
		nutritional_info,
		servings,
	};

	const newRecipe = { ...emptyRecipe, ...prettyRecipeData };

	const { author, host, instructions_list, language, ...recipe } = newRecipe;

	return recipe;
}
