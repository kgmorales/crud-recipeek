//* NESTJS
import { Injectable } from '@nestjs/common';

//* MONGOOSE
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

//* Module
import { IRecipe, IRecipeItem } from '../interfaces';
import { RecipeDto } from '../dtos';
import { Category, Recipe, RecipeIds } from '../schemas';
import { PaprikaApiService, PaprikaService } from '../services';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(RecipeIds.name) private recipeIDModel: Model<RecipeIds>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectConnection() private readonly connection: Connection,
    private paprikaService: PaprikaService,
    private paprikaApiService: PaprikaApiService
  ) {}

  /**
   * Create new Recipe and add to Database.
   */
  //* CREATE
  async createRecipe(recipeDto: RecipeDto): Promise<void> {
    const createdRecipe = new this.recipeModel(recipeDto);

    await this.paprikaApiService.create(recipeDto);
    await createdRecipe.save();
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
    const allIDs = await this.paprikaService.recipeIds();
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
      const newRecipeIds = await paprikaIds.filter(
        (paprikaId) => !dbIds.find((dbId) => paprikaId.uid === dbId.uid)
      );
      const newUIDs = newRecipeIds.map((ids) => ids.uid);
      const newRecipes = await this.paprikaService.findByUID(newUIDs.join(''));

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
  //* FIND BY UID
  async findByUID(uid: string): Promise<Recipe | null> {
    const foundRecipe = await this.recipeModel.findById(uid);
    return foundRecipe || null;
  }
}
