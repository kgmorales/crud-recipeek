import { Module } from '@nestjs/common';

import { BlogService } from './blog._service';
// import { PageService } from './page._service';
// import { RecipesService } from './recipes._service';

// import { ProvidersModule } from './providers/providers._module';

// const imports = [ProvidersModule];

// const services = [PageService, PaprikaService, RecipesService];
const services = [BlogService];

@Module({
  // imports: imports,
  providers: services,
  // exports: [ProvidersModule, ...services],
})
export class ServicesModule {}
