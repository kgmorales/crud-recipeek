import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaprikaApi } from 'paprika-api';
import { Category, RecipeItem } from '../interfaces/recipe.interface';

@Injectable()
export class PaprikaService {
  /** Instance of paprika account connection to Paprika3 app db */
  private paprika: PaprikaApi;

  constructor(private configService: ConfigService) {
    const user = this.configService.get<string>('pakrikaUser') as string;
    const pass = this.configService.get<string>('paprikaPass') as string;

    this.paprika = new PaprikaApi(user, pass);
  }

  async recipesIds(): Promise<RecipeItem[]> {
    return await this.paprika.recipes();
  }

  async newRecipes(uids: string[]) {
    const getRecipe = async (uid: string) =>
      this.paprika.recipe(uid).catch((err) => console.error(err));

    return Promise.all(uids.map((uid: string) => getRecipe(uid)));
  }

  async allRecipes() {
    const getRecipe = async (uid: string) =>
      await this.paprika.recipe(uid).catch((err) => console.error(err));
    const recipeItems = await this.recipesIds();

    return await Promise.all(
      recipeItems.map(async (recipe) => getRecipe(recipe.uid))
    );
  }

  async categories(): Promise<Category[]> {
    return await this.paprika.categories();
  }

  async recipe(uid: string) {
    return await this.paprika.recipe(uid);
  }

  async recipeIds(): Promise<RecipeItem[]> {
    return await this.paprika.recipes();
  }
}
