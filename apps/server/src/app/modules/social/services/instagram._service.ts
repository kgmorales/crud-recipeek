import {
  Injectable,
  HttpException,
  HttpStatus,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { URLSearchParams } from 'url';
import { PrismaService } from '../../shared/services/prisma._service';

const INSTAGRAM_SHORT_TERM_TOKEN_ENDPOINT =
  'https://api.instagram.com/oauth/access_token';
const INSTAGRAM_LONG_TERM_TOKEN_ENDPOINT =
  'https://graph.instagram.com/access_token';
const INSTAGRAM_MEDIA_ENDPOINT = 'https://graph.instagram.com/me/media';

@Injectable()
export class InstagramService implements OnModuleInit {
  private config: {
    client_id: string;
    client_secret: string;
    client_token: string;
    redirectUri: string;
  };

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async onModuleInit(): Promise<void> {
    this.config = await this.buildAuthConfig();
  }

  private async buildAuthConfig() {
    const client_id = this.configService.get<string>(
      'INSTAGRAM_APP_ID',
    ) as string;
    const client_secret = this.configService.get<string>(
      'INSTAGRAM_CLIENT_SECRET',
    ) as string;
    const client_token = this.configService.get<string>(
      'INSTAGRAM_CLIENT_TOKEN',
    ) as string;
    const redirectUri = this.configService.get<string>(
      'INSTAGRAM_REDIRECT_URI',
    ) as string;

    return { client_id, client_secret, client_token, redirectUri };
  }

  public getAuthorizationUrl(): string {
    const { client_id, redirectUri } = this.config;
    const scope = 'user_profile,user_media';
    const responseType = 'code';
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

    console.log(authUrl);
    return authUrl;
  }

  async exchangeCodeForShortTermToken(code: string): Promise<string> {
    const { client_id, client_secret, redirectUri } = this.config;

    const body = new URLSearchParams({
      client_id,
      client_secret,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code: code,
    });

    try {
      const response = await fetch(INSTAGRAM_SHORT_TERM_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new HttpException(
          `Failed to exchange code for token: ${errorResponse.error_message}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await response.json();
      return data.access_token;
    } catch (error: any) {
      throw new HttpException(
        `Failed to exchange code for token: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async exchangeForLongTermToken(shortTermToken: string): Promise<string> {
    const { client_secret } = this.config;

    const body = new URLSearchParams({
      grant_type: 'ig_exchange_token',
      client_secret,
      access_token: shortTermToken,
    });

    try {
      const response = await fetch(
        `${INSTAGRAM_LONG_TERM_TOKEN_ENDPOINT}?${body.toString()}`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new HttpException(
          `Failed to exchange for long-term token: ${errorResponse.error.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await response.json();
      return data.access_token;
    } catch (error: any) {
      throw new HttpException(
        `Failed to exchange for long-term token: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async storeToken(accessToken: string) {
    try {
      await this.prisma.client.instagramLongTermToken.create({
        data: {
          accessToken,
        },
      });
    } catch (error: any) {
      throw new HttpException(
        `Failed to store access token: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserMedia() {
    try {
      const token = await this.prisma.client.instagramLongTermToken.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!token) {
        throw new HttpException(
          'No access token found',
          HttpStatus.BAD_REQUEST,
        );
      }

      const url = `${INSTAGRAM_MEDIA_ENDPOINT}?fields=id,caption,media_url,media_type,permalink&access_token=${token.accessToken}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new HttpException(
          `Failed to get user media: ${errorResponse.error.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const feed = await response.json();
      return feed;
    } catch (error: any) {
      throw new HttpException(
        `Failed to get user media: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
