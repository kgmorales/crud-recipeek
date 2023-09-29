import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma._provider';
import { PaprikaConfig, Status } from '@prisma/client';
import { paprikaBaseHeaders } from '@modules/recipes/constants';
import {
  getErrorMessage,
  toErrorWithMessage,
} from '@modules/recipes/types/error';
import { SyncService } from './sync._provider';

const PAPRIKA_V1_BASEURL = 'https://www.paprikaapp.com/api/v1';

@Injectable()
export class PaprikaAuthService {
  private localConfig: PaprikaConfig;
  authConfig: Promise<PaprikaConfig>;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly syncService: SyncService,
  ) {
    this.localConfig = this.getPaprikaConfig();
    this.authConfig = this.buildAuthConfig();
    console.log({ localConfig: this.localConfig, authConfig: this.authConfig });
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
      id: 0,
      baseURL: this.configService.get<string>('paprika.baseURL') as string,
      bearerToken: this.configService.get<string>(
        'paprika.bearerToken',
      ) as string,
      jwtSecret: this.configService.get<string>('paprika.jwtSecret') as string,
      user: this.configService.get<string>('paprika.user') as string,
      password: this.configService.get<string>('paprika.password') as string,
    };
  }

  async getToken(): Promise<string> {
    // Step 1: Retrieve the initial token (if any) from the database
    const paprikaTokenFromDb =
      await this.prisma.client.paprikaToken.findFirst();
    if (paprikaTokenFromDb && paprikaTokenFromDb.token) {
      try {
        // Step 2: Test the token
        await this.checkTokenValidity(paprikaTokenFromDb.token);
        return paprikaTokenFromDb.token;
      } catch (error) {
        // If token validation fails, proceed to refresh the token
      }
    }

    // Step 3: Refresh the token
    try {
      const newToken = await this.refreshToken();
      await this.prisma.client.paprikaToken.upsert({
        where: { id: 1 }, // use the unique identifier as the where condition
        update: { id: 1, token: newToken }, // update the token if it already exists
        create: { id: 1, token: newToken }, // create a new token if it does not exist
      });
      return newToken;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw toErrorWithMessage(new Error(errorMessage));
    }
  }

  private async checkTokenValidity(token: string): Promise<void> {
    const response = await fetch(`${this.localConfig.baseURL}/sync/status/`, {
      ...paprikaBaseHeaders,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Token validation failed');
    }

    const responseData = await response.json();
    const currentStatus: Status = responseData.result;

    // Retrieve the stored status from the database
    const storedStatus = await this.prisma.client.status.findFirst();

    if (storedStatus) {
      // Update the existing status
      await this.prisma.client.status.update({
        where: { uid: storedStatus.uid },
        data: currentStatus,
      });
    } else {
      // Create a new status
      await this.prisma.client.status.create({
        data: currentStatus,
      });
      this.syncService.recipes();
    }
  }

  private async refreshToken(): Promise<string> {
    // Create a new FormData instance
    const formData = new FormData();
    formData.append('email', this.localConfig.user);
    formData.append('password', this.localConfig.password);

    const response = await fetch(`${PAPRIKA_V1_BASEURL}/account/login/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to refresh token: ${errorText}`);
    }

    const data = await response.json();
    if (data && data.result && data.result.token) {
      return data.result.token;
    } else {
      throw new Error('Token not found in response');
    }
  }
}
