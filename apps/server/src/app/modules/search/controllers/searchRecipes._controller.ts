import { Controller, Get, Query } from '@nestjs/common';
import { SearchRecipesService } from '../services/searchRecipes._service';
import { Recipe } from '@prisma/client';

@Controller('search')
export class SearchRecipesController {
  constructor(private readonly searchService: SearchRecipesService) {}

  @Get()
  search(@Query('searchTerm') searchTerm: string): Promise<Recipe[] | []> {
    return this.searchService.searchRecipes(searchTerm);
  }
}
