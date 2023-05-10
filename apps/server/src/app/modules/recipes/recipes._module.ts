import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';

//TODO: FIX THIS SHOULD BE EXPORTED TO ARRAY. IDK WHY ADDING PROVIDERS RUINS IT
import { PaprikaAuthService } from './services/providers/paprika-auth._provider';
import { PaprikaApiService } from './services/providers/paprika-api._provider';
import { ScrapeService } from './services/providers/scrape._provider';
import { RecipesService } from './services/recipes._service';
import { PaprikaService } from './services/paprika._service';

import { apis } from '@recipes/controllers';
import { schema } from '@recipes/schemas';
// import * as localServices from './services';

// import { ValidateUrlMiddleware } from '@recipes/middleware';

const imports = [
  CacheModule.register(),
  MongooseModule.forFeature([
    { name: schema.Category.name, schema: schema.CategorySchema },
  ]),
  MongooseModule.forFeature([
    { name: schema.PaprikaToken.name, schema: schema.PaprikaTokenSchema },
  ]),
  MongooseModule.forFeature([
    { name: schema.Recipe.name, schema: schema.RecipeSchema },
  ]),
  MongooseModule.forFeature([
    { name: schema.RecipeIds.name, schema: schema.RecipeIdsSchema },
  ]),
];

const services = [
  PaprikaApiService,
  PaprikaAuthService,
  PaprikaService,
  RecipesService,
  ScrapeService,
];

const controllers = apis;

const recipes = { controllers, imports, services };

@Module({
  imports: recipes.imports,
  controllers: recipes.controllers,
  providers: recipes.services,
})
export class RecipesModule {}
