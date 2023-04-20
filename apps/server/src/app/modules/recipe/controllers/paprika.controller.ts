import { Controller, Get, Query } from '@nestjs/common';
import { PaprikaService } from '../services';
import {
  ICategory,
  IRecipe,
  IRecipeItem,
} from '../interfaces/recipe.interface';

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

  @Get('recipesByUID')
  async recipesByUID(@Query('uids') uids: string): Promise<IRecipe[]> {
    return await this.paprikaService.recipesByUID(uids);
  }

  @Get('recipeIds')
  async recipeIds(): Promise<IRecipeItem[]> {
    return await this.paprikaService.recipeIds();
  }
}
