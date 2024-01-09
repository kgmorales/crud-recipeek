import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma._service';
import { Recipe, Category } from '@prisma/client';

import { RecipeDto } from '@recipes/dtos';
import { PaprikaService } from './paprika._service';
import { reduceRecipeData } from '@serverUtils/reduce-recipe.util';
import { RecipeCard } from '@server/types/recipe-card.types';

// interface GetPaginatedRecipesParams {
//   page?: number;
//   limit?: number;
//   filter?: {
//     name?: string;
//     category?: string;
//   };
// }

@Injectable()
export class RecipesService {
  constructor(
    private paprikaService: PaprikaService,
    private prisma: PrismaService,
  ) {}

  async allDBRecipes(): Promise<Recipe[]> {
    return this.prisma.client.recipe.findMany();
  }

  async getRecipeByUID(uid: Recipe['uid']): Promise<Recipe | null> {
    return this.prisma.client.recipe.findUnique({
      where: { uid },
    });
  }

  async allRecipeCards(): Promise<RecipeCard[]> {
    return reduceRecipeData(await this.allDBRecipes(), await this.allDBCategories());
  }

  async allDBCategories(): Promise<Category[]> {
    return this.prisma.client.category.findMany();
  }

  async createRecipe(recipeDto: RecipeDto): Promise<void> {
    await this.prisma.client.recipe.create({ data: recipeDto });
  }

  private async deleteAll(): Promise<void> {
    await this.prisma.client.recipe.deleteMany();
    await this.prisma.client.category.deleteMany();
    await this.prisma.client.recipeItem.deleteMany();
    await this.prisma.client.paprikaToken.deleteMany();
    await this.prisma.client.status.deleteMany();
  }

  // async getPaginatedRecipes(
  //   params: GetPaginatedRecipesParams,
  // ): Promise<{ recipes: RecipeCard[]; total: number }> {
  //   try {
  //     const { page = 1, limit = 10, filter = {} } = params;

  //     const sanitizedLimit = Math.min(Math.max(limit, 1), 100); // Ensuring limit is between 1 and 100
  //     const sanitizedPage = Math.max(page, 1); // Ensuring page is at least 1

  //     const skippedItems = (sanitizedPage - 1) * sanitizedLimit;

  //     const total = await this.prisma.client.recipe.count({
  //       where: filter,
  //     });

  //     const recipes = await this.prisma.client.recipe.findMany({
  //       skip: skippedItems,
  //       take: sanitizedLimit,
  //       where: filter,
  //     });

  //     return { recipes, total };
  //   } catch (error) {
  //     console.error('Error fetching paginated recipes:', error);
  //     throw new Error('Error fetching paginated recipes');
  //   }
  // }

  async getRecipesByMostRecent(): Promise<Recipe[]> {
    return await this.prisma.client.recipe.findMany({
      orderBy: {
        created: 'desc',
      },
      take: 5,
    });
  }

  async refreshDB(): Promise<void> {
    await this.deleteAll();

    const allRecipes = await this.paprikaService.allRecipes();
    const allIDs = await this.paprikaService.recipeIds();
    const allCategories = await this.paprikaService.categories();
    // const status = await this.syncService.status();

    await this.prisma.client.recipe.createMany({ data: allRecipes });
    await this.prisma.client.recipeItem.createMany({ data: allIDs });
    await this.prisma.client.category.createMany({
      data: allCategories,
    });
    // await this.prisma.client.status.create({ data: status });
  }

  async updateRecipes(): Promise<Recipe[]> {
    const paprikaIds = await this.paprikaService.recipeIds();
    const dbRecipeCount = await this.prisma.client.recipe.count();

    if (paprikaIds.length !== dbRecipeCount) {
      const dbIds = await this.prisma.client.recipeItem.findMany();

      const newRecipeIds = paprikaIds.filter(
        (paprikaId) => !dbIds.some((dbId) => paprikaId.uid === dbId.uid),
      );

      const newUIDs = newRecipeIds.map((ids) => ids.uid);
      const newRecipes = await this.paprikaService.findByUID(newUIDs.join(''));

      await this.prisma.client.recipeItem.createMany({
        data: newRecipeIds,
      });
      await this.prisma.client.recipe.createMany({ data: newRecipes });

      return newRecipes;
    }

    return [];
  }
}

// async findRecipesByFilter(params: RecipeFilterDto): Promise<Recipe[]> {
//   return this.prisma.client.recipe.findMany({
//     where: {
//       AND: [{ filters: { some: { name: { contains: params. } } } }],
//     },
//     take: params.take,
//   });
// }
