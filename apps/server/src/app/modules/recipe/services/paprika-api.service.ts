import { Injectable } from '@nestjs/common';
import request, { Options } from 'request-promise-native';

import { ConfigService } from '@nestjs/config';
import {
  IBookmark,
  ICategory,
  IGroceryItem,
  IMeal,
  IMenu,
  IMenuItem,
  IPantryItem,
  IRecipe,
  IRecipeItem,
  IStatus,
} from '../interfaces/recipe.interface';

@Injectable()
export class PaprikaApiService {
  private email: string;
  private password: string;

  private baseUrl = 'https://www.paprikaapp.com/api/v1/sync/';

  constructor(private readonly configService: ConfigService) {
    this.email = this.configService.get<string>('pakrikaUser') as string;
    this.password = this.configService.get<string>('paprikaPass') as string;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private resource(endpoint: string): Promise<any> {
    const options: Options = {
      auth: {
        user: this.email,
        pass: this.password,
      },
      method: 'GET',
      baseUrl: this.baseUrl,
      uri: endpoint,
      json: true,
      headers: {
        'User-Agent': 'PaprikaApi NodeJS library',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform(body: any) {
        return body.result;
      },
    };
    return request(options);
  }

  bookmarks(): Promise<IBookmark[]> {
    return this.resource('bookmarks');
  }

  categories(): Promise<ICategory[]> {
    return this.resource('categories');
  }

  groceries(): Promise<IGroceryItem[]> {
    return this.resource('groceries');
  }

  meals(): Promise<IMeal[]> {
    return this.resource('meals');
  }

  menus(): Promise<IMenu[]> {
    return this.resource('menus');
  }

  menuItems(): Promise<IMenuItem[]> {
    return this.resource('menuitems');
  }

  pantry(): Promise<IPantryItem[]> {
    return this.resource('pantry');
  }

  recipes(): Promise<IRecipeItem[]> {
    return this.resource('recipes');
  }

  recipe(recipeUid: string): Promise<IRecipe> {
    return this.resource('recipe/' + recipeUid);
  }

  status(): Promise<IStatus> {
    return this.resource('status');
  }
}
