// import { Inject, Injectable } from '@nestjs/common';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';
// import { PrismaService } from '../../shared/services/prisma._service';
// import { reduceRecipeData } from '@serverUtils/reduce-recipe.util';
// import { RecipeCard } from '@server/types/recipe-card.types';
// import { Recipe } from '@prisma/client';

// @Injectable()
// export class SearchRecipesService {
//   private lockMap: Map<string, boolean> = new Map();

//   constructor(
//     @Inject(CACHE_MANAGER) private cacheManager: Cache,
//     private prisma: PrismaService,
//   ) {}

//   async searchRecipes(
//     searchTerm: string,
//     excludeUids: string[],
//   ): Promise<RecipeCard[]> {
//     // const cacheKey = `search-recipes-${searchTerm}-${excludeUids.join(',')}`;

//     // // Wait if there's a lock on this cacheKey
//     // await this.waitForLock(cacheKey);

//     // // Lock the cacheKey before proceeding
//     // this.lockMap.set(cacheKey, true);

//     // let recipes: Recipe[]; // Declare recipes as an array of Recipe, not allowing null

//     // try {
//     //   // Attempt to retrieve cached recipes
//     //   const cachedRecipes = await this.cacheManager.get<Recipe[]>(cacheKey);
//     //   if (cachedRecipes) {
//     //     // If cached data exists, use it
//     //     recipes = cachedRecipes;
//     //   } else {
//     // If no cached data, fetch from the database
//     const recipes: Recipe[] = await this.prisma.client.recipe.findMany({
//       where: {
//         AND: [
//           {
//             uid: {
//               notIn: excludeUids,
//             },
//           },
//           {
//             OR: [
//               {
//                 name: {
//                   contains: searchTerm,
//                   mode: 'insensitive',
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     });

//     //     // Cache the fetched data with a TTL
//     //     await this.cacheManager.set(cacheKey, recipes, 300);
//     //   }
//     // } finally {
//     //   // Release the lock regardless of the outcome
//     //   this.lockMap.delete(cacheKey);
//     // }

//     // Return the recipes array, which will be empty if no data was found
//     return reduceRecipeData(recipes);
//   }

//   // private async waitForLock(cacheKey: string): Promise<void> {
//   //   while (this.lockMap.get(cacheKey)) {
//   //     // Wait for 100ms before checking the lock status again
//   //     await new Promise((resolve) => setTimeout(resolve, 100));
//   //   }
//   // }
// }
