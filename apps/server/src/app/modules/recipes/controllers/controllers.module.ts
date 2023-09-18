import { Module } from '@nestjs/common';

import { PageController } from './page._controller';
import { PaprikaController } from './paprika._controller';
import { RecipesController } from './recipe._controller';

//* Modules
import { ServicesModule } from '../services/services._module';

const controllers = [PageController, PaprikaController, RecipesController];

@Module({
  imports: [ServicesModule],
  controllers,
})
export class ControllersModule {}
