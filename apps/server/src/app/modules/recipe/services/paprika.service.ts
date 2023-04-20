import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PaprikaApi } from './paprika-api';
import {
  IRecipe,
  ICategory,
  IRecipeItem,
} from '../interfaces/recipe.interface';

@Injectable()
export class PaprikaService {
  /** Instance of paprika account connection to Paprika3 app db */
  private paprika: PaprikaApi;

  constructor(private configService: ConfigService) {
    const user = this.configService.get<string>('pakrikaUser') as string;
    const pass = this.configService.get<string>('paprikaPass') as string;

    this.paprika = new PaprikaApi(user, pass);
  }

  async recipesIds(): Promise<IRecipeItem[]> {
    return await this.paprika.recipes();
  }

  async recipesByUID(uids: string): Promise<IRecipe[]> {
    const getRecipe = async (uid: string) => await this.paprika.recipe(uid);
    const recipes = await Promise.all(
      uids.split(',').map((uid) => getRecipe(uid))
    );
    return recipes || [];
  }

  async allRecipes(): Promise<IRecipe[]> {
    const recipeItems: IRecipeItem[] = await this.paprika.recipes();
    const recipeUids: string[] = recipeItems.map((item) => item.uid);
    const recipePromises: Promise<IRecipe>[] = recipeUids.map((uid) =>
      this.paprika.recipe(uid)
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
    const categories = await this.paprika.categories();
    return categories || [];
  }

  async recipeIds(): Promise<IRecipeItem[]> {
    const ids = await this.paprika.recipes();
    return ids || [];
  }
}
