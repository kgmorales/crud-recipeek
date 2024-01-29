import { Module } from '@nestjs/common';

import { SpotifyController } from './spotify._controller';

// //* Modules
import { ServicesModule } from '../services/services._module';

const controllers = [SpotifyController];

@Module({
  imports: [ServicesModule],
  controllers,
})
export class ControllersModule {}
