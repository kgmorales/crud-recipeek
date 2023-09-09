import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma._provider';
import request from 'request-promise-native';
import { PaprikaConfig } from '@prisma/client';

@Injectable()
export class PaprikaAuthService {
  private localConfig: PaprikaConfig;
  authConfig: Promise<PaprikaConfig>;
  private paprikaToken: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {
    this.localConfig = this.getPaprikaConfig();
    this.authConfig = this.buildAuthConfig();
  }

  async buildAuthConfig(): Promise<PaprikaConfig> {
    const token = await this.getToken();
    this.localConfig.bearerToken = token;
    return this.localConfig;
  }

  private getPaprikaConfig(token?: string): PaprikaConfig {
    return {
      id: 0,
      baseURL: this.configService.get<string>('paprika.baseURL') as string,
      bearerToken: token || '',
      user: this.configService.get<string>('paprika.user') as string,
      password: this.configService.get<string>('paprika.password') as string,
    };
  }

  async getToken(): Promise<string> {
    if (this.paprikaToken) {
      try {
        await this.checkTokenValidity(this.paprikaToken);
        return this.paprikaToken;
      } catch (error) {
        this.paprikaToken = await this.refreshToken();
      }
    }

    let paprikaToken = await this.prisma.client.paprikaToken.findFirst();

    if (paprikaToken && paprikaToken.token) {
      try {
        await this.checkTokenValidity(paprikaToken.token);
        this.paprikaToken = paprikaToken.token;
        return paprikaToken.token;
      } catch (error) {
        paprikaToken.token = await this.refreshToken();
      }
    } else {
      try {
        paprikaToken = await this.prisma.client.paprikaToken.create({
          data: { token: await this.refreshToken() },
        });
      } catch (error: any) {
        if (error.code === 'P2002') {
          paprikaToken = await this.prisma.client.paprikaToken.findFirst({
            where: { token: await this.refreshToken() },
          });
        } else {
          throw error;
        }
      }
    }

    if (paprikaToken) {
      await this.prisma.client.paprikaToken.update({
        where: { id: paprikaToken.id },
        data: { token: paprikaToken.token },
      });

      this.paprikaToken = paprikaToken.token;
      return paprikaToken.token;
    } else {
      // Attempt to refresh the token one more time before throwing an error
      this.paprikaToken = await this.refreshToken();
      if (this.paprikaToken) {
        return this.paprikaToken;
      } else {
        throw new Error('PaprikaToken is null');
      }
    }
  }

  private async checkTokenValidity(token: string) {
    try {
      const options = {
        url: `${this.localConfig.baseURL}/sync/status/`,
        headers: { Authorization: `Bearer ${token}` },
      };
      await request(options);
    } catch (error) {
      throw new Error('Token validation failed');
    }
  }

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
    return response.result.token;
  }
}
