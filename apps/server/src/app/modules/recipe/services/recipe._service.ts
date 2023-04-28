import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Category, Recipe, RecipeIds } from '../schemas';
import { PaprikaApiService, PaprikaService } from '.';

//* Module
import { IRecipe, IRecipeItem } from '../interfaces/recipe.interface';
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

  /**
   * Create new Recipe and add to Database.
   */
  //* CREATE
  async createRecipe(recipeDto: RecipeDto): Promise<IRecipe> {
    const createdRecipe = new this.recipeModel(recipeDto);

    await this.paprikaApiService.create(recipeDto);
    return createdRecipe.save();
  }

  /**
   * Delete all data in Database.
   */
  //* DELETE
  private async deleteAll(): Promise<void> {
    const collections = await this.connection.db.collections();

    await Promise.all(
      collections.map(async (collection) => {
        await collection.deleteMany({});
      })
    );
  }

  /**
   * Refresh db with new data from Paprika.
   */
  //* REFRESH
  async refreshDB(): Promise<void> {
    await this.deleteAll();
    const allRecipes = await this.paprikaService.allRecipes();
    const allIDs = await this.paprikaService.recipesIds();
    const allCategories = await this.paprikaService.categories();

    await this.recipeModel.insertMany(allRecipes);
    await this.recipeIDModel.insertMany(allIDs);
    await this.categoryModel.insertMany(allCategories);
  }

  /**
   *Updates Database with newly added recipes from paprika.
   * @returns Promise<IRecipe[]>
   */
  //* UPDATE
  async updateRecipes(): Promise<IRecipe[]> {
    const paprikaIds: IRecipeItem[] = await this.paprikaService.recipeIds();
    const dbRecipeCount: number = await this.recipeModel.countDocuments();

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

  /**
   * Find's recipe in Database by UID.
   * @param uid
   * @returns Promise<IRecipe | null>
   */
  //* FIND
  async findById(uid: Pick<IRecipe, 'uid'>): Promise<IRecipe | null> {
    const foundRecipe = await this.recipeModel.findById(uid);

    return foundRecipe || null;
  }
}
