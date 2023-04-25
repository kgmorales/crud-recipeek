import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { createHash } from 'crypto';

import { v4 as uuidv4 } from 'uuid';
import { cleanScrapedRecipe } from '../../../../utils';

import { emptyRecipe, matchPaprikaKeys } from '../../constants';

import { IRecipe, IScrapedRecipe } from '../../interfaces';

@Injectable()
export class ScrapeService {
  private async scrapeUrl(recipeUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const python = spawn('python', [
        'apps/server/src/app/utils/scrape.py',
        recipeUrl,
      ]);

      python.stdout.on('data', (data) => {
        resolve(data.toString());
      });

      python.stderr.on('data', (data) => {
        reject(`stderr: ${data}`);
      });
    });
  }

  private async setScrapeToRecipeModel(
    scrapedRecipe: IScrapedRecipe
  ): Promise<IRecipe> {
    const isEmpty = (obj: Record<string, string>) =>
      Object.keys(obj).length === 0;
    const joinObjectToString = (data: Record<string, string>) =>
      Object.entries(data).join('\n');
    const cleanScraped = cleanScrapedRecipe(matchPaprikaKeys, scrapedRecipe);
    const created = currentDate();

    const categories: string[] = [];
    const deleted = false;
    const uid = `${uuidv4()}`;
    const hash = getHash(uid as string);
    const ingredients =
      cleanScraped.instructions_list.length === 0
        ? ''
        : cleanScraped.instructions_list.join('\n');
    const nutritional_info =
      isEmpty(cleanScraped.nutritional_info) &&
      joinObjectToString(cleanScraped.nutritional_info);
    const on_favorites = 0;
    // const servings = Number(cleanScraped.servings.replace(/\D/g, ''));

    const prettyRecipeData = {
      ...cleanScraped,
      categories,
      created,
      deleted,
      hash,
      ingredients,
      nutritional_info,
      on_favorites,
      // servings,
      uid,
    };

    const newRecipe = { ...emptyRecipe, ...prettyRecipeData };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { author, host, instructions_list, language, ...recipe } = newRecipe;

    return recipe;
  }

  async scrape(url: string): Promise<IRecipe> {
    const scrapedRecipe = await this.scrapeUrl(url);

    const cleanRecipe = JSON.parse(scrapedRecipe);

    const newRecipe = await this.setScrapeToRecipeModel(cleanRecipe);
    return newRecipe || null;
  }
}

function currentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getHash(str: string) {
  const newHash = createHash('sha256');
  newHash.update(str);
  return newHash.digest('hex');
}
