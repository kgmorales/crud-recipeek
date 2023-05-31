import { PaprikaAuthService } from './paprika-auth._provider';
import { PaprikaApiService } from './paprika-api._provider';
import { PrismaService } from './prisma._provider';
import { ScrapeService } from './scrape._provider';

export const providers = [
  PaprikaAuthService,
  PaprikaApiService,
  PrismaService,
  ScrapeService,
];

export { PaprikaAuthService } from './paprika-auth._provider';
export { PaprikaApiService } from './paprika-api._provider';
export { PrismaService } from './prisma._provider';
export { ScrapeService } from './scrape._provider';
