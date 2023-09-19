import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma._provider';
import request from 'request-promise-native';
import { PaprikaConfig } from '@prisma/client';
import { getErrorMessage, toErrorWithMessage } from '../../types/error';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PaprikaAuthService {
  private localConfig: PaprikaConfig;
  authConfig: Promise<PaprikaConfig>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.localConfig = this.getPaprikaConfig();
    this.authConfig = this.buildAuthConfig();
  }

  async buildAuthConfig(): Promise<PaprikaConfig> {
    this.localConfig = {
      ...this.localConfig,
      bearerToken: await bcrypt.hash(await this.getToken(), 10),
    };
    console.log(this.localConfig);
    return this.localConfig;
  }

  private getPaprikaConfig(): PaprikaConfig {
    return {
      baseURL: this.configService.get<string>('paprika.baseURL') as string,
      bearerToken: this.configService.get<string>('paprika.baseURL') as string,
      id: 0,
      jwtSecret: this.configService.get<string>('paprika.jwtSecret') as string,
      user: this.configService.get<string>('paprika.user') as string,
      password: this.configService.get<string>('paprika.password') as string,
    };
  }

  async getToken(): Promise<string> {
    let token: string | null = null;

    // Step 1: Retrieve the initial token (if any) from the database
    const paprikaTokenFromDb =
      await this.prisma.client.paprikaToken.findFirst();

    if (paprikaTokenFromDb && paprikaTokenFromDb.token) {
      const decodedToken = this.jwtService.decode(paprikaTokenFromDb.token);
      if (decodedToken && typeof decodedToken === 'string') {
        const isTokenValid = await bcrypt.compare(
          decodedToken,
          paprikaTokenFromDb.token,
        );
        if (isTokenValid) {
          token = decodedToken;
        }
      }
    }

    if (token) {
      try {
        await this.checkTokenValidity(token);
        return token;
      } catch (error) {
        token = await this.refreshToken();
      }
    } else {
      try {
        token = await bcrypt.hash(await this.refreshToken(), 10);
        await this.prisma.client.paprikaToken.deleteMany();
        await this.prisma.client.paprikaToken.create({ data: { token } });
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw toErrorWithMessage(new Error(errorMessage));
      }
    }

    // Step 3: Ensure that the token variable contains a valid token string before signing it
    if (token) {
      return this.jwtService.sign(token, {
        secret: this.localConfig.jwtSecret,
      });
    } else {
      throw new Error('Failed to retrieve a valid token');
    }
  }

  private async checkTokenValidity(token: string): Promise<void> {
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
