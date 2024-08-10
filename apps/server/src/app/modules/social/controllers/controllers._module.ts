import { Module } from '@nestjs/common';

import { InstagramController } from './instagram._controller';
import { SpotifyController } from './spotify._controller';

//* Modules
import { ServicesModule } from '../services/services._module';

const controllers = [InstagramController, SpotifyController];

@Module({
  imports: [ServicesModule],
  controllers,
})
export class ControllersModule {}
