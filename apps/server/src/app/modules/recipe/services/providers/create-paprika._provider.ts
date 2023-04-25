// import { RecipeDto } from '../../dtos/recipe.dto';
// import { IRecipe } from '../../interfaces/';
// import { Injectable } from '@nestjs/common';
// import axios from 'axios';

// const API_BASE = 'https://www.paprikaapp.com/api/v1/sync/recipes';

// @Injectable()
// export class CreatePaprikaService {

//   encodeBase64(str: string): string {
//     const buffer = Buffer.from(str, 'utf-8');
//     return buffer.toString('base64');
//   }
//   async saveRecipe(recipeDto: RecipeDto): Promise<void> {
//     const payload = JSON.stringify(recipeDto);
//     const headers = {
//       Authorization: `Basic ${auth}`,
//     };

//     await axios.post(API_BASE, payload, {
//       headers,
//     });
//   }
// }
