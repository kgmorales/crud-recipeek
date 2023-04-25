import { Injectable } from '@nestjs/common';
import request, { OptionsWithUrl } from 'request-promise-native';
import zlib from 'zlib';

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
} from '../../interfaces/recipe.interface';
import { RecipeDto } from '../../dtos/recipe.dto';

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
  private resource(endpoint: string, method = 'GET', body?: any): Promise<any> {
    const options: OptionsWithUrl = {
      auth: {
        user: this.email,
        pass: this.password,
      },
      method,
      baseUrl: this.baseUrl,
      url: endpoint,
      json: true,
      headers: {
        'User-Agent': 'PaprikaApi NodeJS library',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform(body: any) {
        return body.result;
      },
    };

    if (body) {
      options.body = body;
    }

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

  private async convertToGzipJson(recipeDto: RecipeDto): Promise<Buffer> {
    const jsonString = JSON.stringify(recipeDto);
    const gzippedJson = await new Promise<Buffer>((resolve, reject) => {
      zlib.gzip(jsonString, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });
    return gzippedJson;
  }

  status(): Promise<IStatus> {
    return this.resource('status');
  }

  async create(recipeDto: RecipeDto): Promise<void> {
    const gzippedJson = await this.convertToGzipJson(recipeDto);

    const options: OptionsWithUrl = {
      auth: {
        user: this.email,
        pass: this.password,
      },
      method: 'POST',
      baseUrl: this.baseUrl,
      url: `recipe/${recipeDto.uid}`,
      body: gzippedJson,
      headers: {
        'User-Agent': 'PaprikaApi NodeJS library',
        'Content-Type': 'application/json',
        'Content-Encoding': 'gzip',
      },
    };

    await request(options);
  }
}
