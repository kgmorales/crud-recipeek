//* NESTJS
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

//* 3RD Party
import request from 'request-promise-native';
import { Model } from 'mongoose';

//* Module

import { PaprikaConfig, PaprikaToken } from '@prisma/client';

@Injectable()
export class PaprikaAuthService {
  /**
   * Promise containing Paprika Auth config
   */
  authConfig: Promise<PaprikaConfig>;

  private localConfig: PaprikaConfig;
  private paprikaToken: string;

  constructor(
    private readonly configService: ConfigService
  ) {
    // Setting the localConfig and config properties
    this.localConfig = this.getPaprikaConfig();
    this.authConfig = this.buildAuthConfig();
  }

  async buildAuthConfig(): Promise<PaprikaConfig> {
    const token = await this.getToken();
    this.localConfig.bearerToken = token;

    return this.localConfig;
  }

  /** Build config auth object containing paprika creds
   *
   * @returns IConfig
   */
  private getPaprikaConfig(token?: string): PaprikaConfig {
    return {
      baseURL: this.configService.get<string>('paprika.baseURL') as string,
      bearerToken: token || '',
      user: this.configService.get<string>('paprika.user') as string,
      password: this.configService.get<string>('paprika.password') as string,
    };
  }

  /** Get the Paprika bearer token.
   *
   * @returns Promise<string>
   */
  async getToken(): Promise<string> {
    // If the token is already set, check its validity and return it
    if (this.paprikaToken) {
      const options = {
        url: `${this.localConfig.baseURL}/sync/status/`,
        headers: {
          Authorization: `Bearer ${this.paprikaToken}`,
        },
      };

      try {
        // Check the token's validity against the sync/status API
        await request(options);

        return this.paprikaToken;
      } catch (error) {
        // The token is invalid, refresh it
        this.paprikaToken = await this.refreshToken();
      }
    }

    // Try to get the token from the database
    let paprikaToken = await this.paprikaTokenModel.findOne().exec();

    if (paprikaToken && paprikaToken.token) {
      const options = {
        url: `${this.localConfig.baseURL}/sync/status/`,
        headers: {
          Authorization: `Bearer ${paprikaToken.token}`,
        },
      };

      try {
        // Check the token's validity against the sync/status API
        await request(options);

        this.paprikaToken = paprikaToken.token;
        return paprikaToken.token;
      } catch (error) {
        // The token is invalid, refresh it
        paprikaToken.token = await this.refreshToken();
      }
    } else {
      // The token doesn't exist in the database, refresh it
      paprikaToken = new this.paprikaTokenModel({
        token: await this.refreshToken(),
      });
    }

    // Save the new token to the database and return it
    await paprikaToken.save();
    this.paprikaToken = paprikaToken.token;

    return paprikaToken.token;
  }

  /** Refresh Paprika API bearer token.
   *
   * @returns Promise<string>
   */
  private async refreshToken(): Promise<string> {
    const options = {
      method: 'POST',
      url: `${this.localConfig.baseURL}/account/login/`,
      json: true,
      formData: {
        email: this.localConfig.user,
        password: this.localConfig.password,
      },
    };

    const response = await request(options);
    // Update configService with token
    const newToken = response.result.token;
    return newToken;
  }
}
