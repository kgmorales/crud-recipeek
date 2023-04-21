// import { Injectable } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
// import FormData from 'form-data';
// import { createReadStream } from 'fs';
// import * as gzip from 'gzip-js';
// import { IRecipe } from '../interfaces';

// @Injectable()
// export class CreatePaprikaService {
//   constructor(private httpService: HttpService) {}

//   private async convertHtmlToJson(recipeHtml: any): Promise<string> {
//     const htmlBuffer = Buffer.from(recipeHtml.data);
//     const gzipHtmlBuffer = Buffer.from(gzip.zip(htmlBuffer, {}));
//     const htmlFormData = new FormData();
//     htmlFormData.append('html', gzipHtmlBuffer, {
//       filename: 'recipe.html',
//     });

//     const stylesJson = JSON.stringify([]);
//     const gzipStylesBuffer = Buffer.from(gzip.zip(Buffer.from(stylesJson), {}));
//     const stylesFormData = new FormData();
//     stylesFormData.append('styles', gzipStylesBuffer, {
//       filename: 'styles.json',
//     });

//     const formData = new FormData();
//     formData.append('html', createReadStream(htmlFormData.getBuffer()), {
//       filename: 'recipe.html',
//     });
//     formData.append('styles', createReadStream(stylesFormData.getBuffer()), {
//       filename: 'styles.json',
//     });

//     const formHeaders = formData.getHeaders();
//     const response = await this.httpService
//       .post('https://www.paprikaapp.com/api/v1/sync/recipes/', formData, {
//         headers: {
//           ...formHeaders,
//         },
//       })
//       .toPromise();
//     return response.data.result;
//   }

//   async createRecipe(recipe: IRecipe): Promise<string> {
//     const html = await this.convertRecipeToHtml(recipe);
//     const json = await this.convertHtmlToJson(html);
//     return json;
//   }
// }
