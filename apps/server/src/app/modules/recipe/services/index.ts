import { PaprikaAuthService } from './providers/paprika-auth._provider';
import { PaprikaApiService } from './providers/paprika-api._provider';
import { ScrapeService } from './providers/scrape._provider';
import { RecipesService } from './recipes._service';
import { PaprikaService } from './paprika._service';

export const services = [
  PaprikaAuthService,
  PaprikaApiService,
  ScrapeService,
  PaprikaService,
  RecipesService,
];

//* Export Services
export * from './providers/paprika-auth._provider';
export * from './providers/paprika-api._provider';
export * from './providers/scrape._provider';
export * from './paprika._service';
export * from './recipes._service';
