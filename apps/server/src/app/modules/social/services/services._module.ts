import { Module } from '@nestjs/common';

import { InstagramService } from './instagram._service';
import { SpotifyService } from './spotify._service';

const services = [InstagramService, SpotifyService];

@Module({
  providers: services,
  exports: services,
})
export class ServicesModule {}
