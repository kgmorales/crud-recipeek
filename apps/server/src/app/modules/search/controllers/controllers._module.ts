import { Module } from '@nestjs/common';

import { SearchRecipesController } from './searchRecipes._controller';

//* Modules
import { ServicesModule } from '../services/services._module';

const controllers = [SearchRecipesController];

@Module({
  imports: [ServicesModule],
  controllers,
})
export class ControllersModule {}
