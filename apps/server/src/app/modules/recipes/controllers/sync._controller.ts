//* NESTJS
import { Controller, Get } from '@nestjs/common';

//* Module
import { SyncService } from '../services/providers/sync._provider';
import { Recipe, Status } from '@prisma/client';

@Controller('sync')
export class SyncController {
  constructor(private syncService: SyncService) {

  }

  @Get('status')
  async syncStatus(): Promise<Status> {
    return await this.syncService.status();
  }
  @Get('recipes')
  async syncRecipes(): Promise<Recipe[]> {
    return await this.syncService.recipes();
  }
}
