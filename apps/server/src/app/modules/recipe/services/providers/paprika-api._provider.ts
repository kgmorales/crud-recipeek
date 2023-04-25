import { Injectable } from '@nestjs/common';
import request, { OptionsWithUrl } from 'request-promise-native';
import zlib from 'zlib';
import FormData from 'form-data';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODI0NTI0NjQsImVtYWlsIjoibmFkYW1zMTY1QGdtYWlsLmNvbSJ9.5T_hL7F5OhYI4_rQn_f-LMR0n29SYK7lpWZ0ILyTl7Q`;

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

  async create(recipeDto: RecipeDto): Promise<void> {
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

    const formData = new FormData();
    formData.append('data', gzippedJson, { filename: 'recipe.json.gz' });

    const options = {
      method: 'POST',
      headers: {
        Host: 'www.paprikaapp.com',
        Accept: '*/*',
        'Accept-Language': 'en-US;q=1.0',
        Connection: 'keep-alive',
        'Accept-Encoding': 'br;q=1.0, gzip;q=0.9, deflate;q=0.8',
        Authorization: `Bearer ${token}`,
      },
      url: `https://www.paprikaapp.com/api/v2/sync/recipe/${recipeDto.uid}`,
      formData: {
        data: {
          value: formData.getBuffer(),
          options: {
            filename: 'recipe.json.gz',
            contentType: 'application/gzip',
          },
        },
      },
    };

    await request(options);
  }
}
