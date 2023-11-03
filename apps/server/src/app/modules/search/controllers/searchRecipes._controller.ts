import { Controller, Get, Query } from '@nestjs/common';
import { SearchRecipesService } from '../services/searchRecipes._service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchRecipesService) {}

  @Get()
  async search(@Query() query: { entity: string; term: string }) {
    const { entity, term } = query;

    try {
      // Perform a search using the search service
      const results = await this.searchService.searchRecipes(entity, term);

      return {
        success: true,
        results,
      };
    } catch (error) {
      return {
        success: false,
        error: 'An error occurred while searching.',
      };
    }
  }
}
