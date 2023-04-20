import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipeSchema } from './schemas/recipe.schema';
import { ConfigService } from '@nestjs/config';

import * as services from './services';
import * as apis from './controllers';
import { CategorySchema } from './schemas/categories.schema';
import { RecipeIdsSchema } from './schemas/recipeIds.schema';
import { PaprikaApi } from './services/paprika-api';

const providers = [
  ConfigService,
  PaprikaApi,
  services.PaprikaService,
  services.RecipesService,
];

const controllers = [apis.PaprikaController, apis.RecipesController];
const recipes = { providers, controllers };

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: 'RecipeIds', schema: RecipeIdsSchema }]),
  ],
  controllers: recipes.controllers,
  providers: recipes.providers,
})
export class RecipesModule {}
