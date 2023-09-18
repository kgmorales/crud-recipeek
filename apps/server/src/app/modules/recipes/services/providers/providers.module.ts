import { Module } from '@nestjs/common';

import { PaprikaApiService } from './paprika-api._provider';
import { PaprikaAuthService } from './paprika-auth._provider';
import { PrismaService } from './prisma._provider';
import { ScrapeService } from './scrape._provider';

const providers = [
  PaprikaApiService,
  PaprikaAuthService,
  PrismaService,
  ScrapeService,
];

@Module({
  providers,
  exports: providers,
})
export class ProvidersModule {}
