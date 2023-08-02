//* NESTJS
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

//* Module
import { RecipeDto } from '@recipes/dtos';
import { Recipe, Category } from '@prisma/client';
import { RecipesService, ScrapeService } from '@recipes/services';

interface SuccessMessage {
  id: number;
  message: string;
}

enum RecipeApi {
  allRecipes = 'allRecipes',
  categories = 'categories',
  create = 'create',
  find = 'find',
  paginatedRecipes = 'paginatedRecipes',
  refreshDB = 'refreshDB',
  scrape = 'scrape',
  update = 'update',
}

@Controller('recipes')
export class RecipesController {
  constructor(
    private recipeService: RecipesService,
    private scrapeService: ScrapeService
  ) {}

  @Get(RecipeApi.allRecipes)
  async getDBRecipes(): Promise<Recipe[]> {
    return await this.recipeService.allDBRecipes();
  }

  @Get(RecipeApi.categories)
  async getDBCategories(): Promise<Category[]> {
    return await this.recipeService.allDBCategories();
  }

  @Post(RecipeApi.create)
  async createRecipe(@Body() recipeDto: RecipeDto): Promise<void> {
    return await this.recipeService.createRecipe(recipeDto);
  }

  // @Get('find/:uid')
  // async findRecipe(
  //   @Param('uid') uid: Pick<Recipe, 'uid'>
  // ): Promise<Recipe | null> {
  //   return await this.recipeService.findByUID(uid);
  // }

  @Get(RecipeApi.paginatedRecipes)
  async getPaginatedRecipes(
    @Query('limit') limit: number,
    @Query('page') page: number
  ) {
    return await this.recipeService.getPaginatedRecipes({ page, limit });
  }

  @Get(RecipeApi.refreshDB)
  async refreshDB(): Promise<SuccessMessage> {
    await this.recipeService.refreshDB();
    return { id: 0, message: 'Success' };
  }

  @Get(RecipeApi.scrape)
  async scrapeRecipe(@Query('url') url: string): Promise<Recipe> {
    return await this.scrapeService.scrape(url);
  }

  @Get(RecipeApi.update)
  async updateRecipes(): Promise<Recipe[]> {
    return await this.recipeService.updateRecipes();
  }
}
