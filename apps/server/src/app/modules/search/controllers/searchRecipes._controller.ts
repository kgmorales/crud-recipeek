// import { Controller, Get, Query } from '@nestjs/common';
// import { SearchRecipesService } from '../services/searchRecipes._service';
// import { RecipeCard } from '@server/types/recipe-card.types';

// @Controller('search')
// export class SearchRecipesController {
//   constructor(private readonly searchRecipesService: SearchRecipesService) {}

//   @Get('recipes')
//   async search(
//     @Query('query') query: string,
//     @Query('exclude') exclude: string,
//   ): Promise<RecipeCard[] | []> {
//     // Split the exclude query parameter into an array of UIDs, if provided
//     const excludeUids = exclude ? exclude.split(',') : [];
//     const results = await this.searchRecipesService.searchRecipes(
//       query,
//       excludeUids,
//     );
//     return results;
//   }
// }
