import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Category, Recipe, RecipeIds } from '../schemas';
import { PaprikaApiService, PaprikaService } from '.';

import { IRecipe } from '../interfaces/recipe.interface';
import { RecipeDto } from '../dtos/recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    private paprikaService: PaprikaService,
    private paprikaApiService: PaprikaApiService,
    @InjectModel(Recipe.name) private recipeModel: Model<IRecipe>,
    @InjectModel(RecipeIds.name) private recipeIDModel: Model<RecipeIds>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectConnection() private readonly connection: Connection
  ) {}

  async createRecipe(recipeDto: RecipeDto): Promise<IRecipe> {
    const createdRecipe = new this.recipeModel(recipeDto);

    await this.paprikaApiService.create(recipeDto);
    return createdRecipe.save();
  }

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

  async updateRecipes(): Promise<IRecipe[]> {
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
}
