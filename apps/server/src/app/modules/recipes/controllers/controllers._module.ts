import { Module } from '@nestjs/common';

import { PaprikaController } from './paprika._controller';
import { RecipesController } from './recipe._controller';
import { SyncController } from './sync._controller';

//* Modules
import { ServicesModule } from '../services/services._module';

const controllers = [
  PaprikaController,
  RecipesController,
  SyncController,
];

@Module({
  imports: [ServicesModule],
  controllers,
})
export class ControllersModule {}
