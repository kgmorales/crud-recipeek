import { Module } from '@nestjs/common';

import { SpotifyService } from './spotify._service';

const services = [SpotifyService];

@Module({
  providers: services,
  exports: services,
})
export class ServicesModule {}
