import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaService } from './prisma._provider';
import { PaprikaAuthService } from './paprika-auth._provider';
import { SyncService } from './sync._provider';
import { PaprikaApiService } from './paprika-api._provider';
import { ScrapeService } from './scrape._provider';

const providers = [
  PrismaService,
  PaprikaAuthService,
  SyncService,
  PaprikaApiService,
  ScrapeService,
];

@Module({
  imports: [ScheduleModule.forRoot()],
  providers,
  exports: providers,
})
export class ProvidersModule {}
