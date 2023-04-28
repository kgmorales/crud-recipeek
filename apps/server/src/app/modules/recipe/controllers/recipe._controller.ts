import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RecipesService } from '../services/recipe._service';
import { IRecipe } from '../interfaces/recipe.interface';
import { ScrapeService } from '../services/providers/scrape._provider';
import { RecipeDto } from '../dtos/recipe.dto';

interface SuccessMessage {
  message: 'Success';
}

@Controller('recipes')
export class RecipesController {
  constructor(
    private recipeService: RecipesService,
    private scrapeService: ScrapeService
  ) {}

  @Post('create')
  async createRecipe(@Body() recipeDto: RecipeDto) {
    await this.recipeService.createRecipe(recipeDto);
  }

  @Get('find/:uid')
  async findRecipe(
    @Param('uid') uid: Pick<IRecipe, 'uid'>
  ): Promise<IRecipe | null> {
    return await this.recipeService.findById(uid);
  }

  @Get('refreshDB')
  async refreshDB(): Promise<SuccessMessage> {
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
