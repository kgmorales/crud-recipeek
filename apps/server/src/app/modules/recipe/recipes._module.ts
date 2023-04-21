import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { CategorySchema, RecipeIdsSchema, RecipeSchema } from './schemas';
import * as services from './services';
import * as apis from './controllers';

import { ValidateUrlMiddleware } from './middleware';

const imports = [
  HttpModule,
  MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
  MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  MongooseModule.forFeature([{ name: 'RecipeIds', schema: RecipeIdsSchema }]),
];

const providers = [
  ConfigService,
  // services.CreatePaprikaService,
  services.PaprikaService,
  services.PaprikaApiService,
  services.RecipesService,
  services.ScrapeService,
  ValidateUrlMiddleware,
];

const controllers = [apis.PaprikaController, apis.RecipesController];

const recipes = { controllers, imports, providers };

@Module({
  imports: recipes.imports,
  controllers: recipes.controllers,
  providers: recipes.providers,
})
export class RecipesModule {}
