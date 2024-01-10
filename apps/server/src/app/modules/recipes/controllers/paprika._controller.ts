//* NESTJS
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

//* Module
import { Recipe } from '@prisma/client';
import { PaprikaService } from '../services/paprika._service';

@Controller('paprika')
export class PaprikaController {
  constructor(private paprikaService: PaprikaService) {}

  @Get('allRecipes')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  async allRecipes(): Promise<Recipe[]> {
    return await this.paprikaService.allRecipes();
  }

  // @Get('recipeIds')
  // async recipeIds(): Promise<RecipeItem[]> {
  //   return await this.paprikaService.recipeIds();
  // }

  // @UseInterceptors(CacheInterceptor)
  // @Get('categories')
  // async allCategories(): Promise<Category[]> {
  //   return await this.paprikaService.categories();
  // }

  // @Get('recipesByUID')
  // async recipesByUID(@Query('uids') uids: string): Promise<Recipe[]> {
  //   return await this.paprikaService.findByUID(uids);
  // }
}
