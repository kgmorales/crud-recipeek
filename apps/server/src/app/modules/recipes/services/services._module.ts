import { Module } from '@nestjs/common';

import { RecipesService } from './recipes._service';
import { PaprikaService } from './paprika._service';
import { PageService } from './page._service';

import { ProvidersModule } from './providers/providers.module';

const imports = [ProvidersModule];

const services = [PageService, PaprikaService, RecipesService];

@Module({
  imports: imports,
  providers: services,
  exports: [ProvidersModule, ...services],
})
export class ServicesModule {}
