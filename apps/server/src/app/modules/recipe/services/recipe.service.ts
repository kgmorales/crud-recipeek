import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from '../schemas/recipe.schema';
import { PaprikaService } from './paprika.service';

@Injectable()
export class RecipesService {
  constructor(
    private paprikaService: PaprikaService,
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>
  ) {}

  async storeAll(): Promise<Recipe[]> {
    return await this.recipeModel.insertMany(
      await this.paprikaService.allRecipes()
    );
  }

  // async findById(id: string): Promise<Recipe> {
  //   return await this.recipeModel.findById(id);
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
