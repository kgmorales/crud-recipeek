import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/providers/prisma._provider';
import { Recipe, Category } from '@prisma/client';

import { RecipeDto } from '@recipes/dtos';
import { PaprikaService } from './paprika._service';

@Injectable()
export class RecipesService {
  constructor(
    private paprikaService: PaprikaService,
    private prisma: PrismaService
  ) {}

  async allDBRecipes(): Promise<Recipe[]> {
    return this.prisma.client.recipe.findMany();
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
  }

  async getPaginatedRecipes({ page = 1, limit = 10 }) {
    limit = limit > 100 ? 100 : limit;

    const skippedItems = (page - 1) * limit;
    const recipes = await this.prisma.client.recipe.findMany({
      skip: skippedItems,
      take: limit,
    });

    return recipes;
  }

  async refreshDB(): Promise<void> {
    await this.deleteAll();

    const allRecipes = await this.paprikaService.allRecipes();
    const allIDs = await this.paprikaService.recipeIds();
    const allCategories = await this.paprikaService.categories();

    await this.prisma.client.recipe.createMany({ data: allRecipes });
    await this.prisma.client.recipeItem.createMany({ data: allIDs });
    await this.prisma.client.category.createMany({
      data: allCategories,
    });
  }

  async updateRecipes(): Promise<Recipe[]> {
    const paprikaIds = await this.paprikaService.recipeIds();
    const dbRecipeCount = await this.prisma.client.recipe.count();

    if (paprikaIds.length !== dbRecipeCount) {
      const dbIds = await this.prisma.client.recipeItem.findMany();

      const newRecipeIds = paprikaIds.filter(
        (paprikaId) => !dbIds.some((dbId) => paprikaId.uid === dbId.uid)
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

  async findRecipeByUID(uid: string): Promise<Recipe | null> {
    return this.prisma.client.recipe.findUnique({
      where: { uid }, // Use the uid field as a unique identifier
    });
  }
}
