import { Injectable, Logger } from '@nestjs/common';
import {
  getErrorMessage,
  // getErrorMessage,
  toErrorWithMessage,
} from '@modules/recipes/types/error';
import { paprikaBaseHeaders } from '@modules/recipes/constants';
import {
  // Category,
  PaprikaConfig,
  Recipe,
  RecipeItem,
  Status,
  // Status,
} from '@prisma/client';
import { PrismaService } from './prisma._provider';
import { resource } from '@server/utils/resource';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);
  private localConfig: PaprikaConfig;

  constructor(
    private readonly configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.localConfig = this.getPaprikaConfig();
    console.log(this.localConfig);
  }

  private getPaprikaConfig(): PaprikaConfig {
    return {
      id: 0,
      baseURL: this.configService.get<string>('paprika.baseURL') as string,
      bearerToken: this.configService.get<string>(
        'paprika.bearerToken',
      ) as string,
      jwtSecret: this.configService.get<string>('paprika.jwtSecret') as string,
      password: this.configService.get<string>('paprika.password') as string,
      user: this.configService.get<string>('paprika.user') as string,
    };
  }

  recipe(recipeUid: string): Promise<Recipe> {
    return resource(
      { user: this.localConfig.user, pass: this.localConfig.password },
      'recipe/' + recipeUid,
    );
  }

  async status(): Promise<Status> {
    try {
      const response = await fetch(`${this.localConfig.baseURL}/sync/status`, {
        method: 'GET',
        headers: {
          ...paprikaBaseHeaders,
          Authorization: `Bearer ${this.localConfig.bearerToken}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw toErrorWithMessage(`Failed to get sync status: ${errorMessage}`);
      }

      const newStatus = await response.json();

      return newStatus.result;
    } catch (error) {
      this.logger.error(getErrorMessage(error));
      throw error;
    }
  }

  async recipes(): Promise<Recipe[]> {
    const response = await fetch(`${this.localConfig.baseURL}/sync/recipes`, {
      method: 'POST',
      headers: {
        ...paprikaBaseHeaders,
        Authorization: `Bearer ${this.localConfig.bearerToken}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw toErrorWithMessage(`Failed to get sync status: ${errorMessage}`);
    }

    const recipeItems: RecipeItem[] = await response.json();
    console.log(recipeItems);

    const recipeUids: RecipeItem['uid'][] = recipeItems.map((item) => item.uid);

    const recipePromises: Promise<Recipe>[] = recipeUids.map((uid) =>
      this.recipe(uid),
    );

    const recipes: Recipe[] = await Promise.all(recipePromises).catch((err) => {
      console.error(err);
      return [];
    });

    for (const recipe of recipes) {
      await this.prisma.client.recipe.upsert({
        where: { uid: recipe.uid },
        update: recipe,
        create: recipe,
      });
    }

    return recipes;
  }

  async categories() {}
}
