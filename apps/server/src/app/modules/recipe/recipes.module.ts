import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipeSchema } from './schemas/recipe.schema';
import { RecipesController } from './controllers/recipe.controller';
import { RecipesService } from './services/recipe.service';
import { PaprikaService } from './services/paprika.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
  ],
  controllers: [RecipesController],
  providers: [ConfigService, PaprikaService, RecipesService],
})
export class RecipesModule {}
