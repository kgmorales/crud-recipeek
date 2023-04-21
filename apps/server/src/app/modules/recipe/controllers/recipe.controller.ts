import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { RecipesService } from '../services/recipe.service';
import { IRecipe } from '../interfaces/recipe.interface';
import { ScrapeService } from '../services/scrape.service';
import { ValidateUrlMiddleware } from '../middleware/validate-url.middleware';
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

  // @Post('create')
  // async create(@Body() recipeDto: RecipeDto): Promise<SuccessMessage> {
  //   await this.recipeService.create(recipeDto);
  //   return { message: 'Success' };
  // }

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

  @Get('scrape')
  @UsePipes(ValidateUrlMiddleware)
  async scrapeRecipe(@Query('url') url: string): Promise<IRecipe> {
    return await this.scrapeService.scrape(url);
  }
}
