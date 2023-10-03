import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from './prisma._provider';
import { Recipe, Status } from '@prisma/client';

import { PaprikaAuthService } from './paprika-auth._provider';
import { paprikaBaseHeaders } from '@modules/recipes/constants';
import {
  getErrorMessage,
  toErrorWithMessage,
} from '@modules/recipes/types/error';
import { PaprikaApiService } from './paprika-api._provider';
import { omit } from '@server/utils/omit';

const baseURL = 'https://www.paprikaapp.com/api/v2/sync';

@Injectable()
export class SyncService implements OnModuleInit {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    private prisma: PrismaService,
    private paprikaAuthService: PaprikaAuthService,
    private paprikaApiService: PaprikaApiService,
  ) {}

  async onModuleInit() {
    await this.syncDataWithPaprika();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncEveryDay() {
    this.logger.log('Starting daily sync with Paprika at midnight');
    try {
      await this.syncDataWithPaprika();
      this.logger.log('Sync with Paprika completed successfully');
    } catch (error) {
      this.logger.error('Error during sync with Paprika:', error);
    }
  }

  async syncDataWithPaprika(): Promise<void> {
    const token = await this.paprikaAuthService.ensureValidToken();
    const remoteStatus = await this.fetchStatus(token);
    const localStatus: Status | null =
      await this.prisma.client.status.findFirst();

    const local = localStatus ? omit(localStatus, ['createdAt', 'uid']) : {};

    // If there's no local status or if the local status is different from the remote status
    if (
      !localStatus ||
      JSON.stringify(remoteStatus) !== JSON.stringify(local)
    ) {
      const remote = { ...remoteStatus, uid: 1 };
      // Upsert the status in Prisma with id as 1
      await this.prisma.client.status.upsert({
        where: { uid: 1 },
        update: { ...remote },
        create: { ...remote },
      });

      await this.syncRecipes(token);
      await this.syncCategories(token);
    }
  }

  async fetchStatus(token: string): Promise<Status> {
    const response = await fetch(`${baseURL}/status`, {
      headers: {
        ...paprikaBaseHeaders,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      this.logger.error(getErrorMessage(new Error(errorMessage)));
      throw toErrorWithMessage(`Failed to fetch status: ${errorMessage}`);
    }

    const status = await response.json();

    return status.result;
  }

  async syncRecipes(token: string): Promise<void> {
    const response = await fetch(`${baseURL}/recipes`, {
      headers: {
        ...paprikaBaseHeaders,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      this.logger.error(`Failed to sync recipes: ${errorMessage}`);
      throw new Error(`Failed to sync recipes: ${errorMessage}`);
    }

    const responseData = await response.json();
    const recipeItems = responseData.result; // Adjust based on the actual structure

    if (!Array.isArray(recipeItems)) {
      this.logger.error(
        `Unexpected response format: ${JSON.stringify(responseData)}`,
      );
      throw new Error('Unexpected response format from sync/recipes endpoint');
    }

    const recipeUids: string[] = recipeItems.map((item) => item.uid);
    //* 2.
    const recipePromises: Promise<Recipe>[] = recipeUids.map((uid) =>
      this.paprikaApiService.recipe(uid),
    );
    const recipes: Recipe[] = await Promise.all(recipePromises).catch((err) => {
      console.error(err);
      return [];
    });

    // Upsert the fetched recipes into the Prisma database
    for (const recipe of recipes) {
      await this.prisma.client.recipe.upsert({
        where: { uid: recipe.uid },
        update: recipe,
        create: recipe,
      });
    }
  }

  async syncCategories(token: string): Promise<void> {
    const response = await fetch(`${baseURL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      this.logger.error(getErrorMessage(new Error(errorMessage)));
      throw toErrorWithMessage(`Failed to sync categories: ${errorMessage}`);
    }

    const responseData = await response.json();
    const categories = responseData.result;

    if (!Array.isArray(categories)) {
      this.logger.error(
        `Unexpected response format for categories: ${JSON.stringify(
          responseData,
        )}`,
      );
      throw new Error(
        'Unexpected response format from sync/categories endpoint',
      );
    }

    for (const category of categories) {
      await this.prisma.client.category.upsert({
        where: { uid: category.uid },
        update: category,
        create: category,
      });
    }
  }
}
