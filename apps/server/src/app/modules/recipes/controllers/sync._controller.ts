//* NESTJS
import { Controller, Get } from '@nestjs/common';
// import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

//* Module
import { SyncService } from '../services/providers/sync._provider';
import { Status } from '@prisma/client';

@Controller('sync')
export class SyncController {
  constructor(private syncService: SyncService) {}

  @Get('status')
  async getStatus(): Promise<Status> {
    return await this.syncService.checkStatus();
  }

  // @Get('recipes')
  // // @UseInterceptors(CacheInterceptor)
  // // @CacheTTL(1000)
  // async allRecipes(): Promise<Recipe[]> {
  //   return await this.paprikaService.allRecipes();
  // }

  // // @UseInterceptors(CacheInterceptor)
  // @Get('categories')
  // async allCategories(): Promise<Category[]> {
  //   return await this.paprikaService.categories();
  // }
}
