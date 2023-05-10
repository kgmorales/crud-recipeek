//* NESTJS
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

//* Module
import { ICategory, IRecipe, IRecipeItem } from '@recipes/interfaces';
import { PaprikaService } from '@recipes/services';

@Controller('paprika')
export class PaprikaController {
  constructor(private paprikaService: PaprikaService) {}

  @Get('allRecipes')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  async allRecipes(): Promise<IRecipe[]> {
    return await this.paprikaService.allRecipes();
  }

  @UseInterceptors(CacheInterceptor)
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
