import { Module } from '@nestjs/common';

import { BlogController } from './blog._controller';

// //* Modules
import { ServicesModule } from '../services/services._module';

const controllers = [
  BlogController,

];

@Module({
  imports: [ServicesModule],
  controllers,
})
export class ControllersModule {}
