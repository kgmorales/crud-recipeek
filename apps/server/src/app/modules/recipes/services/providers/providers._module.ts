import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { PaprikaAuthService } from './paprika-auth._provider';
import { SyncService } from './sync._provider';
import { PaprikaApiService } from './paprika-api._provider';
import { ScrapeService } from './scrape._provider';

const providers = [
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
