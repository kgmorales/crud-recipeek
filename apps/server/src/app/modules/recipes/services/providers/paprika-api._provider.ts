//* NESTJS
import { Injectable, OnModuleInit } from '@nestjs/common';

//* Module
// import { paprikaBaseHeaders } from '@recipes/constants';
// import { RecipeDto } from '@recipes/dtos';
import { PaprikaAuthService } from '../providers/paprika-auth._provider';
import {
  Bookmark,
  Category,
  GroceryItem,
  Meal,
  Menu,
  MenuItem,
  PantryItem,
  PaprikaConfig,
  Recipe,
  RecipeItem,
} from '@prisma/client';

import { paprikaBaseHeaders } from '@modules/recipes/constants';

const PAPRIKA_V1_BASEURL = 'https://www.paprikaapp.com/api/v1';

@Injectable()
export class PaprikaApiService implements OnModuleInit {
  private paprikaConfig: PaprikaConfig;

  constructor(private paprikaAuthService: PaprikaAuthService) {}

  async onModuleInit() {
    //Get the Paprika config from the auth service
    this.paprikaConfig = await this.paprikaAuthService.buildAuthConfig();
  }

  /**
   * Make a request to the Paprika API with authentication headers
   */
  private async resource(endpoint: string, method = 'GET', body?: Body) {
    const url = `${PAPRIKA_V1_BASEURL}/sync/${endpoint}`;
    const headers = {
      ...paprikaBaseHeaders,
      Authorization: `Basic ${Buffer.from(
        `${this.paprikaConfig.user}:${this.paprikaConfig.password}`,
      ).toString('base64')}`,
    };

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch resource from ${endpoint}. Status: ${response.status}`,
      );
    }

    const data = await response.json();
    return data.result;
  }

  bookmarks(): Promise<Bookmark[]> {
    return this.resource('bookmarks');
  }

  categories(): Promise<Category[]> {
    return this.resource('categories');
  }

  groceries(): Promise<GroceryItem[]> {
    return this.resource('groceries');
  }

  meals(): Promise<Meal[]> {
    return this.resource('meals');
  }

  menus(): Promise<Menu[]> {
    return this.resource('menus');
  }

  menuItems(): Promise<MenuItem[]> {
    return this.resource('menuitems');
  }

  pantry(): Promise<PantryItem[]> {
    return this.resource('pantry');
  }

  recipes(): Promise<RecipeItem[]> {
    return this.resource('recipes');
  }

  recipe(recipeUid: string): Promise<Recipe> {
    return this.resource('recipe/' + recipeUid);
  }

  // /**
  //  * GZip a JSON string
  //  * @param jsonString @type string
  //  * @returns Promise<Buffer>
  //  */
  // private async gZip(jsonString: string): Promise<Buffer> {
  //   return await new Promise<Buffer>((resolve, reject) => {
  //     zlib.gzip(jsonString, (err, buffer) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(buffer);
  //       }
  //     });
  //   });
  // }

  //! This requires getting photodata, which is not finished.
  // async create(recipeDto: RecipeDto): Promise<void> {
  //    if (!recipeDto) {
  //        throw new Error('Recipe DTO is null or undefined');
  //    }

  //    const gzippedJson = await this.gZip(JSON.stringify(recipeDto));
  //    const formData = new FormData();

  //    if (recipeDto.image_url) {
  //        const photoData = await this.getPhotoData(recipeDto.image_url);

  //        formData.append('photo', photoData, {
  //            filename: `recipe.jpg`,
  //        });

  //        formData.append('data', gzippedJson, {
  //            filename: 'recipe.json.gz',
  //            contentType: 'application/gzip',
  //        });
  //    }

  //    const response = await fetch(`${this.paprikaConfig.baseURL}/sync/recipe/${recipeDto.uid}`, {
  //        method: 'POST',
  //        headers: {
  //            ...paprikaBaseHeaders,
  //            'Authorization': `Bearer ${this.paprikaConfig.bearerToken}`
  //        },
  //        body: formData
  //    });

  //    if (!response.ok) {
  //        throw new Error(`Failed to create recipe. Status: ${response.status}`);
  //    }
  // }
}

// /**
//  * Get the binary data for Photo URL
//  * @param photoUrl @type string
//  * @returns
//  */
// private async getPhotoData(photoUrl: string): Promise<Buffer> {
//    const response = await fetch(photoUrl);
//    const photoData = await response.buffer();
//    return photoData;
// }
