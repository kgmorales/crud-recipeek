//* NESTJS
import { Controller, Get } from '@nestjs/common';

//* Module
import { SyncService } from '../services/providers/sync._provider';
// import { Recipe, Status } from '@prisma/client';
// import { Recipe, Status } from '@prisma/client';

@Controller('sync')
export class SyncController {
  constructor(private syncService: SyncService) {}

  @Get('status')
  async syncStatus(): Promise<void> {
    return await this.syncService.syncDataWithPaprika();
  }
  // @Get('recipes')
  // async syncRecipes(): Promise<Recipe[]> {
  //   return await this.syncService.syncRecipes();
  // }
}
