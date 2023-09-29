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

//* 3RD PARTY
import zlib from 'zlib';
import { resource } from '@server/utils/resource';
// import FormData from 'form-data';

interface v1Creds {
  user: string;
  pass: string;
}
@Injectable()
export class PaprikaApiService implements OnModuleInit {
  private paprikaConfig: PaprikaConfig;
  private v1Creds: v1Creds;

  constructor(private paprikaAuthService: PaprikaAuthService) {}

  async onModuleInit() {
    //Get the Paprika config from the auth service
    this.paprikaConfig = await this.paprikaAuthService.buildAuthConfig();
    this.v1Creds = {
      user: this.paprikaConfig.user,
      pass: this.paprikaConfig.password,
    };
  }

  bookmarks(): Promise<Bookmark[]> {
    return resource(this.v1Creds, 'bookmarks');
  }

  categories(): Promise<Category[]> {
    return resource(this.v1Creds, 'categories');
  }

  groceries(): Promise<GroceryItem[]> {
    return resource(this.v1Creds, 'groceries');
  }

  meals(): Promise<Meal[]> {
    return resource(this.v1Creds, 'meals');
  }

  menus(): Promise<Menu[]> {
    return resource(this.v1Creds, 'menus');
  }

  menuItems(): Promise<MenuItem[]> {
    return resource(this.v1Creds, 'menuitems');
  }

  pantry(): Promise<PantryItem[]> {
    return resource(this.v1Creds, 'pantry');
  }

  recipes(): Promise<RecipeItem[]> {
    return resource(this.v1Creds, 'recipes');
  }

  recipe(recipeUid: string): Promise<Recipe> {
    return resource(this.v1Creds, 'recipe/' + recipeUid);
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

  //! This requires getting photodata, which is not finished.
  // async create(recipeDto: RecipeDto): Promise<void> {
  //   if (!recipeDto) {
  //     throw new Error('Recipe DTO is null or undefined');
  //   }

  //   const gzippedJson = await this.gZip(JSON.stringify(recipeDto));
  //   const formData = new FormData();

  //   if (recipeDto.image_url) {
  //     const photoData = await this.getPhotoData(recipeDto.image_url);

  //     formData.append('photo', photoData, {
  //       filename: `recipe.jpg`,
  //     });

  //     formData.append('data', gzippedJson, {
  //       filename: 'recipe.json.gz',
  //       contentType: 'application/gzip',
  //     });
  //   }

  //   const options: OptionsWithUrl = {
  //     method: 'POST',
  //     headers: {
  //       ...paprikaBaseHeaders,
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: `Bearer ${this.paprikaConfig.bearerToken}`,
  //     },
  //     url: `${this.paprikaConfig.baseURL}/sync/recipe/${recipeDto.uid}`,
  //     formData,
  //   };

  //   await request(options);
  // }
}

// /**
//  * Get the binary data for Photo URL
//  * @param photoUrl @type string
//  * @returns
//  */
// private async getPhotoData(photoUrl: string): Promise<Buffer> {
//   console.log(photoUrl);
//   const options: OptionsWithUrl = {
//     url: photoUrl,
//     encoding: null,
//   };
//   const photoData = await request.get(options);
//   return photoData;
// }
