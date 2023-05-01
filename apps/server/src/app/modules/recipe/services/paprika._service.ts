import { Injectable } from '@nestjs/common';

import { IRecipe, ICategory, IRecipeItem } from '../interfaces';
import { PaprikaApiService } from '../services/providers/paprika-api._provider';

@Injectable()
export class PaprikaService {
  constructor(private paprikaApiService: PaprikaApiService) {}

  /**
   * Retrieve All Recipes From Paprika.
   * 1. Get array of recipe ID's
   * 2. Find Each Recipe By all UID's and add to Recipe Collection.
   * @returns Promise<IRecipe[]>
   */
  //* ALL RECIPES
  async allRecipes(): Promise<IRecipe[]> {
    //* 1.
    const recipeItems: IRecipeItem[] = await this.paprikaApiService.recipes();
    const recipeUids: string[] = recipeItems.map((item) => item.uid);
    //* 2.
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

  /**
   * All Categories from Paprika.
   * @returns Promise<ICategory[]>
   */
  //* CATEGORIES
  async categories(): Promise<ICategory[]> {
    const categories = await this.paprikaApiService.categories();
    return categories || [];
  }

  /**
   * Find recipes by array of recipe uid's as 1 string.
   * @param uids
   * @returns Promise<IRecipe[]>
   */
  //* FIND BY UIDS
  async findByUID(uids: string): Promise<IRecipe[]> {
    const getRecipe = async (uid: string) =>
      await this.paprikaApiService.recipe(uid);

    const recipes = await Promise.all(
      uids.split(',').map((uid) => getRecipe(uid))
    );

    return recipes || [];
  }

  /**
   * Gets all recipe Item ID's which is *REQUIRED!!!* for all recipe search.
   * @returns Promise<IRecipeItem[]>
   */
  //* RECIPE IDS
  async recipeIds(): Promise<IRecipeItem[]> {
    const ids = await this.paprikaApiService.recipes();
    return ids || [];
  }
}
