import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import * as apis from './controllers';
import {
  Category,
  PaprikaToken,
  Recipe,
  RecipeIds,
  CategorySchema,
  PaprikaTokenSchema,
  RecipeIdsSchema,
  RecipeSchema,
} from './schemas';
import * as localServices from './services';

// import { ValidateUrlMiddleware } from '@recipes/middleware';

const imports = [
  HttpModule,
  MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  MongooseModule.forFeature([
    { name: PaprikaToken.name, schema: PaprikaTokenSchema },
  ]),
  MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  MongooseModule.forFeature([
    { name: RecipeIds.name, schema: RecipeIdsSchema },
  ]),
];

const services = [ConfigService, ...localServices.services];

const controllers = apis.controllers;

const recipes = { controllers, imports, services };

@Module({
  imports: recipes.imports,
  controllers: recipes.controllers,
  providers: recipes.services,
})
export class RecipesModule {}
