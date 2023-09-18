//* NESTJS
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

//* Module
import { RecipeDto } from '@recipes/dtos';
import { Recipe, Category } from '@prisma/client';
import { RecipesService } from '../services/recipes._service';
import { ScrapeService } from '../services/providers/scrape._provider';
import { SuccessMessageDto } from '../dtos/success-message';

@Controller('recipes')
export class RecipesController {
  constructor(
    private recipeService: RecipesService,
    private scrapeService: ScrapeService,
  ) {}

  @Get('allRecipes')
  async getDBRecipes(): Promise<Recipe[]> {
    return await this.recipeService.allDBRecipes();
  }

  @Get('categories')
  async getDBCategories(): Promise<Category[]> {
    return await this.recipeService.allDBCategories();
  }

  @Post('create')
  async createRecipe(@Body() recipeDto: RecipeDto): Promise<void> {
    return await this.recipeService.createRecipe(recipeDto);
  }

  @Get('paginatedRecipes')
  async getPaginatedRecipes(
    @Query()
    query: {
      page?: number;
      limit?: number;
      filter: Record<string, never>;
    },
  ) {
    const { page, limit, filter } = query;
    return this.recipeService.getPaginatedRecipes({ page, limit, filter });
  }

  @Get('refreshDB')
  async refreshDB(): Promise<SuccessMessageDto> {
    await this.recipeService.refreshDB();
    return { id: 0, message: 'Success' };
  }

  @Get('scrape')
  async scrapeRecipe(@Query('url') url: string): Promise<Recipe> {
    return await this.scrapeService.scrape(url);
  }

  @Get('update')
  async updateRecipes(): Promise<Recipe[]> {
    return await this.recipeService.updateRecipes();
  }
}
