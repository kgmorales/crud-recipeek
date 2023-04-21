import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

import { v4 as uuidv4 } from 'uuid';
import { cleanScrapedRecipe } from '../../../../utils';

import { emptyRecipe, matchPaprikaKeys } from '../../constants';

import { IRecipe, IScrapedRecipe } from '../../interfaces';

@Injectable()
export class ScrapeService {
  private async scrapeUrl(recipeUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const python = spawn('python3', [
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

    const categories: string[] = [];
    const ingredients =
      cleanScraped.instructions_list.length === 0
        ? ''
        : cleanScraped.instructions_list.join('\n');
    const nutritional_info =
      isEmpty(cleanScraped.nutritional_info) &&
      joinObjectToString(cleanScraped.nutritional_info);
    const servings = Number(cleanScraped.servings.replace(/\D/g, ''));
    const uid = `${uuidv4()}`;

    const prettyRecipeData = {
      ...cleanScraped,
      categories,
      ingredients,
      nutritional_info,
      servings,
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
