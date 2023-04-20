import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesService } from '../services/recipe.service';
import { IRecipe } from '../interfaces/recipe.interface';

// import * as paprika from '../middleware/recipes/paprika.middleware';
// import * as scraper from '../middleware/recipes/scraper.middleware';
// import * as sharedTypes from '../../../shared/types';

interface SuccessMessage {
  message: 'Success';
}

@Controller('recipes')
export class RecipesController {
  constructor(private recipeService: RecipesService) {}

  @Get('refreshDB')
  async refreshDB(): Promise<SuccessMessage> {
    await this.recipeService.refreshDB();
    return { message: 'Success' };
  }

  @Get('update')
  async updateRecipes() {
    return await this.recipeService.updateRecipes();
  }

  @Get('find/:uid')
  async find(@Param('uid') uid: Pick<IRecipe, 'uid'>): Promise<IRecipe | null> {
    return await this.recipeService.findById(uid);
  }

  // @Get('scraped-recipe')
  // async getScrapedRecipe(@Query('url') url: string): Promise<IRecipe> {
  //   return await scraper.scrapeRecipe(url);
  // }
}
