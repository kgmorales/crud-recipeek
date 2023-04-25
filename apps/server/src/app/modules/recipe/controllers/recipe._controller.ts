import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesService } from '../services/recipe._service';
import { IRecipe } from '../interfaces/recipe.interface';
import { ScrapeService } from '../services/providers/scrape._service';

interface SuccessMessage {
  message: 'Success';
}

@Controller('recipes')
export class RecipesController {
  constructor(
    private recipeService: RecipesService,
    private scrapeService: ScrapeService
  ) {}

  @Get('refreshDB')
  async refreshDB(): Promise<SuccessMessage> {
    await this.recipeService.refreshDB();
    return { message: 'Success' };
  }

  @Get('update')
  async updateRecipes(): Promise<IRecipe[]> {
    return await this.recipeService.updateRecipes();
  }

  @Get('find/:uid')
  async findRecipe(@Param('uid') uid: Pick<IRecipe, 'uid'>): Promise<IRecipe | null> {
    return await this.recipeService.findById(uid);
  }

  @Get('scrape')
  async scrapeRecipe(@Query('url') url: string): Promise<IRecipe> {
    return await this.scrapeService.scrape(url);
  }
}
