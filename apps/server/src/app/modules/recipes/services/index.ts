import {
  PaprikaApiService,
  PaprikaAuthService,
  ScrapeService,
} from './providers';
import { RecipesService } from './recipes._service';
import { PaprikaService } from './paprika._service';

export const services = [
  PaprikaService,
  RecipesService,
  PaprikaApiService,
  PaprikaAuthService,
  ScrapeService,
];

export * from './providers/paprika-api._provider';
export * from './providers/paprika-auth._provider';
export * from './providers/scrape._provider';
export * from './paprika._service';
export * from './recipes._service';
