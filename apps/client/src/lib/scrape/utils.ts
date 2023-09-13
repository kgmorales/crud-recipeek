import { Recipe, ScrapedRecipe } from '@prisma/client';
import { spawn } from 'child_process';
import { createHash, randomUUID } from 'crypto';
import { cleanScrapedRecipe } from './scrapeCleaner';
import { emptyRecipe, matchPaprikaKeys } from '../../constants';

export const scrapeByUrl = async (recipeUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const python = spawn('python', ['lib/scrape.py', recipeUrl]);

    python.stdout.on('data', (data) => {
      resolve(data.toString());
    });

    python.stderr.on('data', (data) => {
      reject(`stderr: ${data}`);
    });
  });
};

export const setScrapeToRecipeModel = async (
  scrapedRecipe: ScrapedRecipe,
): Promise<Recipe> => {
  const isEmpty = (obj: Record<string, string>) =>
    Object.keys(obj).length === 0;
  const joinObjectToString = (data: Record<string, string>) =>
    Object.entries(data).join('\n');

  // TODO: Import or define the cleanScrapedRecipe and matchPaprikaKeys functions

  const cleanScraped = cleanScrapedRecipe(matchPaprikaKeys, scrapedRecipe);
  const created = currentDate();

  const categories: string[] = [];
  const uid = randomUUID();
  const hash = getHash(uid);
  const ingredients =
    cleanScraped.instructions_list.length === 0
      ? ''
      : cleanScraped.instructions_list.join('\n');
  const nutritional_info = isEmpty(cleanScraped.nutritional_info)
    ? ''
    : joinObjectToString(cleanScraped.nutritional_info);

  const prettyRecipeData = {
    ...cleanScraped,
    categories,
    created,
    hash,
    ingredients,
    nutritional_info,
    uid,
  };

  const newRecipe = { ...emptyRecipe, ...prettyRecipeData };

  const {
    author,
    category,
    host,
    instructions_list,
    language,
    source,
    ...recipe
  } = newRecipe;

  return recipe;
};

export const scrape = async (url: string): Promise<Recipe> => {
  const rawScrapedRecipe = await scrapeByUrl(url);
  const newRecipe = await setScrapeToRecipeModel(JSON.parse(rawScrapedRecipe));
  return newRecipe || null;
};

function currentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getHash(str: string): string {
  const newHash = createHash('sha256');
  newHash.update(str);
  return newHash.digest('hex');
}
