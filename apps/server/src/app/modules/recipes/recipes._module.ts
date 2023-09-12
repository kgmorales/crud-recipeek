import { Module } from '@nestjs/common';

import { CacheModule } from '@nestjs/cache-manager';
import { PaprikaApiService } from './services/providers/paprika-api._provider';
import { PaprikaAuthService } from './services/providers/paprika-auth._provider';
import { PrismaService } from './services/providers/prisma._provider';
import { ScrapeService } from './services/providers/scrape._provider';
import { RecipesService } from './services/recipes._service';
import { PaprikaService } from './services/paprika._service';

import { apis } from '@recipes/controllers';

const imports = [CacheModule.register()];

const services = [
  PaprikaApiService,
  PaprikaAuthService,
  PaprikaService,
  PrismaService,
  RecipesService,
  ScrapeService,
];

const controllers = apis;

@Module({
  imports: imports,
  controllers: controllers,
  providers: services,
})
export class RecipesModule {}
