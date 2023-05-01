import { Injectable } from '@nestjs/common';
import request, { OptionsWithUrl } from 'request-promise-native';
import zlib from 'zlib';
import FormData from 'form-data';

import * as model from '@recipes/interfaces';
import { RecipeDto } from '@recipes/dtos';
import { PaprikaAuthService } from '@recipes/services/providers';

@Injectable()
export class PaprikaApiService {
  private paprikaConfig: model.IPaprikaConfig;

  constructor(private paprikaAuthService: PaprikaAuthService) {
    this.paprikaConfig = this.paprikaAuthService.paprikaConfig;
  }

  private async gZip(jsonString: string): Promise<Buffer> {
    return await new Promise<Buffer>((resolve, reject) => {
      zlib.gzip(jsonString, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });
  }

  private async getPhotoData(photoUrl: string): Promise<Buffer> {
    const options: OptionsWithUrl = {
      url: photoUrl,
      encoding: null,
    };
    const photoData = await request.get(options);
    return photoData;
  }

  private resource(endpoint: string, method = 'GET', body?: Body) {
    const options: OptionsWithUrl = {
      auth: {
        user: this.paprikaConfig.user,
        pass: this.paprikaConfig.password,
      },
      method,
      baseUrl: this.paprikaConfig.baseURL,
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

  bookmarks(): Promise<model.IBookmark[]> {
    return this.resource('bookmarks');
  }

  categories(): Promise<model.ICategory[]> {
    return this.resource('categories');
  }

  groceries(): Promise<model.IGroceryItem[]> {
    return this.resource('groceries');
  }

  meals(): Promise<model.IMeal[]> {
    return this.resource('meals');
  }

  menus(): Promise<model.IMenu[]> {
    return this.resource('menus');
  }

  menuItems(): Promise<model.IMenuItem[]> {
    return this.resource('menuitems');
  }

  pantry(): Promise<model.IPantryItem[]> {
    return this.resource('pantry');
  }

  recipes(): Promise<model.IRecipeItem[]> {
    return this.resource('recipes');
  }

  recipe(recipeUid: string): Promise<model.IRecipe> {
    return this.resource('recipe/' + recipeUid);
  }

  async create(recipeDto: RecipeDto): Promise<void> {
    const gzippedJson = await this.gZip(JSON.stringify(recipeDto));
    const formData = new FormData();

    formData.append('data', gzippedJson, { filename: 'recipe.json.gz' });

    if (recipeDto.image_url) {
      const photoData = await this.getPhotoData(recipeDto.image_url);
      formData.append('photo', photoData, { filename: 'photo.jpg' });
    }

    const options: OptionsWithUrl = {
      method: 'POST',
      headers: {
        Host: 'www.paprikaapp.com',
        Accept: '*/*',
        'Accept-Language': 'en-US;q=1.0',
        Connection: 'keep-alive',
        'Accept-Encoding': 'br;q=1.0, gzip;q=0.9, deflate;q=0.8',
        Authorization: `Bearer ${this.paprikaConfig.bearerToken}`,
      },
      url: `${this.paprikaConfig.baseURL}/sync/recipe/${recipeDto.uid}`,
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
