import { Module } from '@nestjs/common';

import { InstagramService } from './instagram._service';
import { SpotifyService } from './spotify._service';
import { SharedModule } from '@modules/shared/shared._module';

const imports = [SharedModule];

const services = [SharedModule, InstagramService, SpotifyService];

@Module({
  imports,
  providers: services,
  exports: services,
})
export class ServicesModule {}
