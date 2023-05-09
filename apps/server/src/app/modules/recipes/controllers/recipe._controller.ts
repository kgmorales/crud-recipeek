//* NESTJS
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

//* Module
import { RecipeDto } from '@recipes/dtos';
import { IRecipe, ISuccessMessage } from '@recipes/interfaces';
import { RecipesService, ScrapeService } from '@recipes/services';

@Controller('recipes')
export class RecipesController {
  constructor(
    private recipeService: RecipesService,
    private scrapeService: ScrapeService
  ) {}

  @Post('create')
  async createRecipe(@Body() recipeDto: RecipeDto) {
    return this.recipeService.createRecipe(recipeDto);
  }

  @Get('find/:uid')
  async findRecipe(
    @Param('uid') uid: Pick<IRecipe, 'uid'>
  ): Promise<IRecipe | null> {
    return await this.recipeService.findByUID(uid);
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
