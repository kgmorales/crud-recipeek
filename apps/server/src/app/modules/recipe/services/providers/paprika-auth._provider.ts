//* NESTJS
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import request, { OptionsWithUrl } from 'request-promise-native';

//* Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//* Module
import { PaprikaTokenDto } from '../../dtos';
import { IPaprikaConfig } from '../../interfaces';
import { PaprikaToken } from '../../schemas';

const paprikaV2URL = 'https://www.paprikaapp.com/api/v2';

@Injectable()
export class PaprikaAuthService {
  paprikaConfig: IPaprikaConfig;
  private paprikaToken: string;

  constructor(
    @InjectModel(PaprikaToken.name)
    private paprikaTokenModel: Model<PaprikaToken>,
    private readonly configService: ConfigService
  ) {
    this.paprikaConfig = this.getConfig();
    this.getToken().then((token) => {
      this.paprikaToken = token;
    });
  }

  /** Build private config object containing paprika creds

  @returns IConfig
  */
  private getConfig(): IPaprikaConfig {
    return {
      baseUrl: this.configService.get<string>('paprika.baseUrl') as string,
      bearerToken: this.configService.get<string>(
        'paprika.bearerToken'
      ) as string,
      email: this.configService.get<string>('paprika.user') as string,
      password: this.configService.get<string>('paprika.password') as string,
    };
  }
  /**  Get the Paprika bearer token.
  @returns Promise<string>
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
        url: `${paprikaV2URL}/sync/status/`,
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

  private async refreshToken(): Promise<string> {
    const options = {
      method: 'POST',
      url: `${paprikaV2URL}/account/login/`,
      json: true,
      body: {
        email: this.paprikaConfig.email,
        password: this.paprikaConfig.password,
      },
    };
    const response = await request(options);

    return response.token;
  }
}
