import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Category, Recipe, RecipeIds } from '../schemas';
import { PaprikaService } from '../services';

import { IRecipe } from '../interfaces/recipe.interface';
import { Url } from 'url';

@Injectable()
export class RecipesService {
  constructor(
    private paprikaService: PaprikaService,
    @InjectModel(Recipe.name) private recipeModel: Model<IRecipe>,
    @InjectModel(RecipeIds.name) private recipeIDModel: Model<RecipeIds>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectConnection() private readonly connection: Connection
  ) {}

  private async deleteAll(): Promise<void> {
    const collections = await this.connection.db.collections();

    await Promise.all(
      collections.map(async (collection) => {
        await collection.deleteMany({});
      })
    );
  }

  async refreshDB(): Promise<void> {
    await this.deleteAll();
    const allRecipes = await this.paprikaService.allRecipes();
    const allIDs = await this.paprikaService.recipesIds();
    const allCategories = await this.paprikaService.categories();

    await this.recipeModel.insertMany(allRecipes);
    await this.recipeIDModel.insertMany(allIDs);
    await this.categoryModel.insertMany(allCategories);
  }

  async updateRecipes() {
    const paprikaIds = await this.paprikaService.recipeIds();
    const dbRecipeCount = await this.recipeModel.countDocuments();

    if (paprikaIds.length !== dbRecipeCount) {
      const dbIds = await this.recipeIDModel.find().lean();
      const newRecipeIds = paprikaIds.filter(
        (paprikaId) => !dbIds.find((dbId) => paprikaId.uid === dbId.uid)
      );
      const newUIDs = newRecipeIds.map((ids) => ids.uid);
      const newRecipes = await this.paprikaService.recipesByUID(
        newUIDs.join('')
      );

      await this.recipeIDModel.collection.insertMany(newRecipeIds);
      await this.recipeModel.collection.insertMany(newRecipes);

      return newRecipes;
    }
    return [];
  }

  async findById(uid: Pick<IRecipe, 'uid'>): Promise<IRecipe | null> {
    const foundRecipe = await this.recipeModel.findById(uid);

    return foundRecipe || null;
  }

  // async scrapeRecipe(url: Url): Promise<IRecipe> {
  //   try {
  //     const cleanRecipe = JSON.parse(scrapedRecipe);
  //     const recipe = await scraper.setScrapeToRecipeModel(cleanRecipe);

  //     return { recipe };
  //   } catch {
  //     throw new Error('Problem scraping Recipe');
  //   }
  // }
  // }

  // async findByName(name: string): Promise<Recipe[]> {
  //   return await this.recipeModel.findByName(name);
  // }

  // public async findByAlignment(alignment: string): Promise<Recipe[]> {
  //   return await this.recipeModel.findByAlignment(alignment);
  // }

  // public async create(hero: Recipe) {
  //   const newHero = await this.recipeModel.create(hero);
  //   return newHero;
  // }

  // public async delete(id: string) {
  //   return this.recipeModel.findByIdAndRemove(id);
  // }

  // private get recipeModel() {
  //   return this.RecipesModel.herosRepository();
  // }
}
