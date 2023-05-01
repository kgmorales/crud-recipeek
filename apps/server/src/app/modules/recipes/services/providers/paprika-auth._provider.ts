import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import request, { OptionsWithUrl } from 'request-promise-native';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IPaprikaConfig } from '@recipes/interfaces';
import { PaprikaToken } from '@recipes/schemas';

const PAPRIKA_V2_URL = 'https://www.paprikaapp.com/api/v2';

@Injectable()
export class PaprikaAuthService {
  paprikaConfig: IPaprikaConfig;
  private paprikaToken: string;

  constructor(
    @InjectModel(PaprikaToken.name)
    private readonly paprikaTokenModel: Model<PaprikaToken>,
    private readonly configService: ConfigService
  ) {
    this.paprikaConfig = this.getConfig();
    this.getToken().then((token) => {
      this.paprikaToken = token;
    });
  }

  /** Build private config object containing paprika creds
   *
   * @returns IConfig
   */
  private getConfig(): IPaprikaConfig {
    return {
      baseURL: this.configService.get<string>('paprika.baseURL') as string,
      bearerToken: this.configService.get<string>(
        'paprika.bearerToken'
      ) as string,
      user: this.configService.get<string>('paprika.user') as string,
      password: this.configService.get<string>('paprika.password') as string,
    };
  }

  /** Get the Paprika bearer token.
   *
   * @returns Promise<string>
   */
  async getToken(): Promise<string> {
    // If the token is already set, return it
    if (this.paprikaToken) {
      return this.paprikaToken;
    }

    // Try to get the token from the database
    let paprikaToken = await this.paprikaTokenModel.findOne().exec();

    if (paprikaToken && paprikaToken.token) {
      const options: OptionsWithUrl = {
        url: `${PAPRIKA_V2_URL}/sync/status/`,
        headers: {
          Authorization: `Bearer ${paprikaToken.token}`,
        },
      };

      try {
        await request(options);
        this.paprikaToken = paprikaToken.token;

        // Update configService with token
        this.configService.get('paprika').bearerToken = paprikaToken.token;

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

    // Update configService with token
    this.configService.get('paprika').bearerToken = paprikaToken.token;

    return paprikaToken.token;
  }

  /** Refresh Paprika bearer token.
   *
   * @returns Promise<string>
   */
  private async refreshToken(): Promise<string> {
    const options = {
      method: 'POST',
      url: `${PAPRIKA_V2_URL}/account/login/`,
      json: true,
      formData: {
        email: this.paprikaConfig.user,
        password: this.paprikaConfig.password,
      },
    };

    const response = await request(options);

    return await response.result.token;
  }
}
