import { Module } from '@nestjs/common';

import { PaprikaService } from './paprika._service';
import { PageService } from './page._service';
import { RecipesService } from './recipes._service';

import { ProvidersModule } from './providers/providers._module';
import { SharedModule } from '@modules/shared/shared._module';

const imports = [ProvidersModule, SharedModule];

const services = [PageService, PaprikaService, RecipesService];

@Module({
  imports: imports,
  providers: services,
  exports: [ProvidersModule, ...services],
})
export class ServicesModule {}
