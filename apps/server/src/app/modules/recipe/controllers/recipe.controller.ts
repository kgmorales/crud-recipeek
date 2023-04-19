import { Controller, Get } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import { RecipesService } from '../services/recipe.service';
// import { Recipe } from '../models/recipe.model';
// import { RecipeIds } from '../models/recipeIds.model';
// import { Category } from '../models/categories.model';
// import * as paprika from '../middleware/recipes/paprika.middleware';
// import * as scraper from '../middleware/recipes/scraper.middleware';
// import * as sharedTypes from '../../../shared/types';

@Controller('recipes')
export class RecipesController {
  constructor(
    private recipeService: RecipesService
  ) {}

  @Get('storeAll')
  storeRecipes() {
    this.recipeService.storeAll();
  }

  // @Get('deleteAll')
  // deleteAll() {
  //   // const collections = mongoose.connection.collections;

  //   await Promise.all(
  //     Object.values(collections).map(async (collection) => {
  //       await this.recipeModel.deleteMany({});
  //     })
  //   );
  // }

  // @Get('update')
  // async updateRecipes() {
  //   const paprikaIds = await paprika.paprikaRecipeIds();
  //   const dbRecipeCount = await this.recipeModel.count();

  //   const sendAllRecipes = () => {
  //     return this.recipeModel.find().exec();
  //   };

  //   if (paprikaIds.length !== dbRecipeCount) {
  //     const dbIds = await this.recipeIdsModel.find().lean();
  //     const newRecipeIds = paprikaIds.filter(
  //       (paprikaId) => !dbIds.find((dbId) => paprikaId.uid === dbId.uid)
  //     );
  //     const newUIds = newRecipeIds.map((ids) => ids.uid);
  //     const newRecipes = await paprika.paprikaNewRecipes(newUIds);

  //     await this.recipeIdsModel.collection.insertMany(newRecipeIds);
  //     await this.recipeModel.collection.insertMany(
  //       newRecipes as sharedTypes.Recipe[]
  //     );
  //   }

  //   const recipes = await sendAllRecipes();
  //   return { recipes };
  // }

  // @Get('categories')
  // async updateCategories() {
  //   const paprikaCategories = await paprika.paprikaCategories();
  //   const dbCategoriesCount = await this.categoryModel.count();

  //   const sendAllCategories = () => {
  //     return this.categoryModel.find().exec();
  //   };

  //   if (paprikaCategories.length !== dbCategoriesCount) {
  //     const dbCategories = await this.categoryModel.find().lean();
  //     const newCategories = paprikaCategories.filter(
  //       (paprikaId: paprika) =>
  //         !dbCategories.find((dbId) => paprikaId.uid === dbId.uid)
  //     );

  //     await this.categoryModel.collection.insertMany(newCategories);
  //   }

  //   const categories = await sendAllCategories();
  //   return { categories };
  // }

  // @Get('scraped-recipe')
  // async getScrapedRecipe(@Query('url') url: string): Recipe {
  //   const scrapedRecipe = await scraper.scrapeRecipe(url);

  //   try {
  //     const cleanRecipe = JSON.parse(scrapedRecipe);
  //     const recipe = await scraper.setScrapeToRecipeModel(cleanRecipe);

  //     return { recipe };
  //   } catch {
  //     throw new Error('Problem scraping Recipe');
  //   }
  // }
}
