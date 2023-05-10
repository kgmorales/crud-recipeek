//* NESTJS
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

//* Module
import { RecipeDto } from '@recipes/dtos';
import { ICategory, IRecipe, ISuccessMessage } from '@recipes/interfaces';
import { RecipesService, ScrapeService } from '@recipes/services';

@Controller('recipes')
export class RecipesController {
  constructor(
    private recipeService: RecipesService,
    private scrapeService: ScrapeService
  ) {}

  @Get('allDBRecipes')
  async getDBRecipes(): Promise<IRecipe[]> {
    return await this.recipeService.allDBRecipes();
  }

  @Get('categories')
  async getDBCategories(): Promise<ICategory[]> {
    return await this.recipeService.allDBCategories();
  }

  @Post('create')
  async createRecipe(@Body() recipeDto: RecipeDto): Promise<void> {
    return await this.recipeService.createRecipe(recipeDto);
  }

  @Get('find/:uid')
  async findRecipe(
    @Param('uid') uid: Pick<IRecipe, 'uid'>
  ): Promise<IRecipe | null> {
    return await this.recipeService.findByUID(uid);
  }

  @Get('paginatedRecipes')
  async getPaginatedRecipes(
    @Query('limit') limit: number,
    @Query('page') page: number
  ) {
    return await this.recipeService.getPaginatedRecipes({ page, limit });
  }

  @Get('refreshDB')
  async refreshDB(): Promise<ISuccessMessage> {
    await this.recipeService.refreshDB();
    return { message: 'Success' };
  }

  @Get('scrape')
  async scrapeRecipe(@Query('url') url: string): Promise<IRecipe> {
    return await this.scrapeService.scrape(url);
  }

  @Get('update')
  async updateRecipes(): Promise<IRecipe[]> {
    return await this.recipeService.updateRecipes();
  }
}
