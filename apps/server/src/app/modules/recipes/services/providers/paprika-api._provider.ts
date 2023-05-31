//* NESTJS
import { Injectable } from '@nestjs/common';

//* 3RD PARTY
import zlib from 'zlib';
import FormData from 'form-data';
import request, { OptionsWithUrl } from 'request-promise-native';

//* Module
import { paprikaBaseHeaders } from '@recipes/constants';
import { RecipeDto } from '@recipes/dtos';
import * as model from '@recipes/interfaces';
import { PaprikaAuthService } from '@recipes/services/providers';
import { Recipe, Category } from '@prisma/client';

const PAPRIKA_V1_BASEURL = 'https://www.paprikaapp.com/api/v1';

@Injectable()
export class PaprikaApiService {
  private paprikaConfig: model.IPaprikaConfig;

  constructor(private paprikaAuthService: PaprikaAuthService) {
    // Get the Paprika config from the auth service
    this.paprikaAuthService.authConfig.then((config) => {
      this.paprikaConfig = config;
    });
  }

  /**
   * GZip a JSON string
   * @param jsonString @type string
   * @returns Promise<Buffer>
   */
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

  /**
   * Get the binary data for Photo URL
   * @param photoUrl @type string
   * @returns
   */
  private async getPhotoData(photoUrl: string): Promise<Buffer> {
    console.log(photoUrl);
    const options: OptionsWithUrl = {
      url: photoUrl,
      encoding: null,
    };
    const photoData = await request.get(options);
    return photoData;
  }

  /**
   * Make a request to the Paprika API with authentication headers
   */
  private resource(endpoint: string, method = 'GET', body?: Body) {
    const options: OptionsWithUrl = {
      auth: {
        user: this.paprikaConfig.user,
        pass: this.paprikaConfig.password,
      },
      method,
      baseUrl: `${PAPRIKA_V1_BASEURL}/sync/`,
      url: endpoint,
      json: true,
      // Use the 'result' property of the response
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

  categories(): Promise<Category[]> {
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

  recipe(recipeUid: string): Promise<Recipe> {
    return this.resource('recipe/' + recipeUid);
  }

  async create(recipeDto: RecipeDto): Promise<void> {
    if (!recipeDto) {
      throw new Error('Recipe DTO is null or undefined');
    }

    const gzippedJson = await this.gZip(JSON.stringify(recipeDto));
    const formData = new FormData();

    if (recipeDto.image_url) {
      const photoData = await this.getPhotoData(recipeDto.image_url);

      formData.append('photo', photoData, {
        filename: `recipe.jpg`,
      });

      formData.append('data', gzippedJson, {
        filename: 'recipe.json.gz',
        contentType: 'application/gzip',
      });
    }

    const options: OptionsWithUrl = {
      method: 'POST',
      headers: {
        ...paprikaBaseHeaders,
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.paprikaConfig.bearerToken}`,
      },
      url: `${this.paprikaConfig.baseURL}/sync/recipe/${recipeDto.uid}`,
      formData,
    };

    await request(options);
  }
}
