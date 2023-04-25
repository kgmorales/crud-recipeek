import { Injectable } from '@nestjs/common';

import { PaprikaApiService } from './providers/paprika-api._service';
import {
  IRecipe,
  ICategory,
  IRecipeItem,
} from '../interfaces/recipe.interface';

@Injectable()
export class PaprikaService {
  constructor(
    // private httpService: HttpService,
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
}
