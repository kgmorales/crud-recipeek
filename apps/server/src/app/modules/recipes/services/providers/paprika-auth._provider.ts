import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaprikaConfig } from '@prisma/client';

import { PrismaService } from '@modules/shared/services/prisma._service';
import { paprikaBaseHeaders } from '@modules/recipes/constants';
import { getErrorMessage, toErrorWithMessage } from '@serverUtils/error';

const baseURL = 'https://www.paprikaapp.com/api/v2';

@Injectable()
export class PaprikaAuthService implements OnModuleInit {
  private readonly logger = new Logger(PaprikaAuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit(): Promise<void> {
    this.buildAuthConfig();
  }

  async buildAuthConfig(): Promise<PaprikaConfig> {
    const user = this.configService.get<string>('PAPRIKA_USER') as string;
    const password = this.configService.getOrThrow<string>(
      'PAPRIKA_PASS',
    ) as string;
    const id = 1;
    const jwtSecret = '';

    const bearerToken = await this.ensureValidToken();

    return { baseURL, user, password, bearerToken, id, jwtSecret };
  }

  async getTokenFromDB(): Promise<string | null> {
    const tokenEntry = await this.prisma.client.paprikaToken.findFirst();
    return tokenEntry?.token || null;
  }

  async isTokenValid(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${baseURL}/sync/status`, {
        headers: {
          ...paprikaBaseHeaders,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(getErrorMessage(error));
        throw toErrorWithMessage(`Error validating token: ${error.message}`);
      }
      throw error;
    }
  }

  async refreshToken(): Promise<string> {
    const user = this.configService.get<string>('PAPRIKA_USER') as string;
    const password = this.configService.get<string>('PAPRIKA_PASS') as string;

    // Format the body as x-www-form-urlencoded
    const bodyData = new URLSearchParams();
    bodyData.append('email', user);
    bodyData.append('password', password);

    const response = await fetch(`${baseURL}/account/login`, {
      method: 'POST',
      headers: {
        ...paprikaBaseHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyData.toString(),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      this.logger.error(getErrorMessage(new Error(errorMessage)));
      throw toErrorWithMessage(`Failed to refresh token: ${errorMessage}`);
    }

    const data = await response.json();
    const newToken = data.result.token;

    if (!newToken) {
      throw new Error('Token is missing from the response');
    }

    // Save the new token to the database
    await this.prisma.client.paprikaToken.upsert({
      where: { id: 1 },
      update: { token: newToken },
      create: { id: 1, token: newToken },
    });

    return newToken;
  }

  async ensureValidToken(): Promise<string> {
    let token = await this.getTokenFromDB();

    if (!token || !(await this.isTokenValid(token))) {
      token = await this.refreshToken();
    }

    return token;
  }
}
