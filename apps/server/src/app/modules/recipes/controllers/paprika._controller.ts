import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { PaprikaService } from '../services/paprika._service';
import { ICategory, IRecipe, IRecipeItem } from '../interfaces';

@Controller('paprika')
export class PaprikaController {
  constructor(private paprikaService: PaprikaService) {}

  @Get('allRecipes')
  async allRecipes(): Promise<IRecipe[]> {
    return await this.paprikaService.allRecipes();
  }

  @Get('categories')
  async allCategories(): Promise<ICategory[]> {
    return await this.paprikaService.categories();
  }

  @Get('recipeIds')
  async recipeIds(): Promise<IRecipeItem[]> {
    return await this.paprikaService.recipeIds();
  }

  @Get('recipesByUID')
  async recipesByUID(@Query('uids') uids: string): Promise<IRecipe[]> {
    return await this.paprikaService.findByUID(uids);
  }
}
