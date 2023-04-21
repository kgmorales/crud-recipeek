import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import FormData from 'form-data';
import { createReadStream } from 'fs';
import * as gzip from 'gzip-js';
import { AxiosResponse } from 'axios';

import { PaprikaApiService } from './paprika-api.service';
import {
  IRecipe,
  ICategory,
  IRecipeItem,
} from '../interfaces/recipe.interface';

@Injectable()
export class PaprikaService {
  constructor(
    private httpService: HttpService,
    private paprikaApiService: PaprikaApiService
  ) {}

  async recipesIds(): Promise<IRecipeItem[]> {
    return await this.paprikaApiService.recipes();
  }

  async recipesByUID(uids: string): Promise<IRecipe[]> {
    const getRecipe = async (uid: string) =>
      await this.paprikaApiService.recipe(uid);

    const recipes = await Promise.all(
      uids.split(',').map((uid) => getRecipe(uid))
    );

    return recipes || [];
  }

  async allRecipes(): Promise<IRecipe[]> {
    const recipeItems: IRecipeItem[] = await this.paprikaApiService.recipes();
    const recipeUids: string[] = recipeItems.map((item) => item.uid);
    const recipePromises: Promise<IRecipe>[] = recipeUids.map((uid) =>
      this.paprikaApiService.recipe(uid)
    );
    const recipes: IRecipe[] = await Promise.all(recipePromises).catch(
      (err) => {
        console.error(err);
        return [];
      }
    );
    return recipes;
  }

  async categories(): Promise<ICategory[]> {
    const categories = await this.paprikaApiService.categories();
    return categories || [];
  }

  async recipeIds(): Promise<IRecipeItem[]> {
    const ids = await this.paprikaApiService.recipes();
    return ids || [];
  }

  private async convertRecipeToFormData(recipe: IRecipe): Promise<FormData> {
    const recipeFormData = new FormData();
    const recipeJson = JSON.stringify(recipe);
    const gzipRecipeBuffer = Buffer.from(gzip.zip(Buffer.from(recipeJson), {}));
    recipeFormData.append('data', createReadStream(gzipRecipeBuffer), {
      filename: 'recipe.json',
    });
    return recipeFormData;
  }

  async syncRecipe(recipe: IRecipe): Promise<string> {
    const formData = await this.convertRecipeToFormData(recipe);
    const headers = formData.getHeaders();
    const response = await this.httpService
      .post(
        `https://www.paprikaapp.com/api/v1/sync/recipe/${recipe.uid}/`,
        formData,
        {
          headers: {
            ...headers,
            'Content-Encoding': 'gzip',
          },
        }
      )
      .toPromise();

    if (!response) {
      throw new Error('Response is undefined');
    }

    return response.data.result;
  }
}
