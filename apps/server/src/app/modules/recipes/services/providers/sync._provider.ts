//* NESTJS
import { Injectable, OnModuleInit } from '@nestjs/common';

//* Module
// import { paprikaBaseHeaders } from '@recipes/constants';
// import { RecipeDto } from '@recipes/dtos';
import { paprikaBaseHeaders } from '@modules/recipes/constants';
import { PaprikaAuthService } from './paprika-auth._provider';
import {
  // Bookmark,
  // Category,
  // GroceryItem,
  // Meal,
  // Menu,
  // MenuItem,
  // PantryItem,
  PaprikaConfig,
  Status,
  // Recipe,
  // RecipeItem,
} from '@prisma/client';

import request from 'request-promise-native';

@Injectable()
export class SyncService implements OnModuleInit {
  private paprikaConfig: PaprikaConfig;

  constructor(private paprikaAuthService: PaprikaAuthService) {}

  async onModuleInit() {
    //Get the Paprika config from the auth service
    this.paprikaConfig = await this.paprikaAuthService.authConfig;
  }

  async checkStatus(): Promise<Status> {
    try {
      // Ensure the bearer token is available
      if (!this.paprikaConfig || !this.paprikaConfig.bearerToken) {
        throw new Error('Bearer token not available');
      }

      const options = {
        method: 'GET',
        url: `${this.paprikaConfig.baseURL}/sync/status`,
        headers: {
          ...paprikaBaseHeaders,
          Authorization: `Bearer ${this.paprikaConfig.bearerToken}`,
        },
      };

      console.log('Making request with options:', options); // Log the request options

      const status: Status = await request(options);
      console.log('Received status:', status);
      return status;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Detailed error during status check:', error);
      if (error.statusCode) {
        console.error('Error status code:', error.statusCode);
      }
      if (error.statusMessage) {
        console.error('Error status message:', error.statusMessage);
      }
      throw new Error('Status Check Failed');
    }
  }
}
