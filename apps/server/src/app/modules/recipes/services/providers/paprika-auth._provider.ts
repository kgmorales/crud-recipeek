import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma._provider';
import request, { OptionsWithUrl } from 'request-promise-native';
import { PaprikaConfig } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

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

  /**
   *
   * @returns Promise<PaprikaConfig>
   * returns a PaprikaConfig object with a hashed bearerToken
   */
  async buildAuthConfig(): Promise<PaprikaConfig> {
    return {
      ...this.localConfig,
      bearerToken: await this.getToken(),
    };
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
    // Step 1: Retrieve the initial token (if any) from the database
    const tokenFromDB = await this.prisma.client.paprikaToken.findFirst();

    if (tokenFromDB?.token) {
      // Step 2: Verify the token's signature to ensure it's valid
      const isTokenVerified = this.jwtService.verify(tokenFromDB.token, {
        secret: this.localConfig.jwtSecret,
      });

      if (isTokenVerified) {
        // Step 3: Check if the token is valid with the Paprika API
        const isValidWithPaprika = await this.checkTokenPaprikaValidity(
          tokenFromDB.token,
        );

        if (isValidWithPaprika) {
          // The token is valid, so return it
          return tokenFromDB.token;
        }
      }
    }

    //* TOKEN !VERIFIED || NULL, so we refresh the token
    const newToken = await this.refreshToken();

    // Store the new token in the database
    await this.prisma.client.paprikaToken.deleteMany();
    await this.prisma.client.paprikaToken.create({
      data: { token: newToken },
    });

    return this.jwtService.sign(newToken, {
      secret: this.localConfig.jwtSecret,
    });
  }

  private async checkTokenPaprikaValidity(token: string): Promise<boolean> {
    const options = {
      url: `${this.localConfig.baseURL}/sync/status/`,
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await request(options);
    return response.statusCode === 200;
  }

  private async refreshToken(): Promise<string> {
    const options: OptionsWithUrl = {
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
