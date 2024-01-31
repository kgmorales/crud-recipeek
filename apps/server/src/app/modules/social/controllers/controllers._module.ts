import { Module } from '@nestjs/common';

import { SocialController } from './social._controller';

// //* Modules
import { ServicesModule } from '../services/services._module';

const controllers = [SocialController];

@Module({
  imports: [ServicesModule],
  controllers,
})
export class ControllersModule {}
