//* NESTJS
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

//* 3RD Party
import request from 'request-promise-native';
import { Model } from 'mongoose';

//* Module
import { IPaprikaConfig } from '@recipes/interfaces';
import { PaprikaToken } from '@recipes/schemas';

const PAPRIKA_V2_URL = 'https://www.paprikaapp.com/api/v2';

@Injectable()
export class PaprikaAuthService {
  config: Promise<IPaprikaConfig>;
  private localConfig: IPaprikaConfig;
  private paprikaToken: string;

  constructor(
    @InjectModel(PaprikaToken.name)
    private readonly paprikaTokenModel: Model<PaprikaToken>,
    private readonly configService: ConfigService
  ) {
    this.localConfig = this.getPaprikaConfig();
    this.config = this.getAuthConfig();
  }

  async getAuthConfig(): Promise<IPaprikaConfig> {
    const token = await this.getToken();
    this.localConfig.bearerToken = token;

    return this.localConfig;
  }

  /** Build config auth object containing paprika creds
   *
   * @returns IConfig
   */
  private getPaprikaConfig(token?: string): IPaprikaConfig {
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
    // If the token is already set, return it
    if (this.paprikaToken) {
      return this.paprikaToken;
    }

    // Try to get the token from the database
    let paprikaToken = await this.paprikaTokenModel.findOne().exec();

    if (paprikaToken && paprikaToken.token) {
      const options = {
        url: `${PAPRIKA_V2_URL}/sync/status/`,
        headers: {
          Authorization: `Bearer ${paprikaToken.token}`,
        },
      };

      try {
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
