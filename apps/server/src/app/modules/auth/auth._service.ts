// auth.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';

// instagram.types.ts
export interface InstagramAuthResponse {
  access_token: string;
  user_id: number;
}

export interface InstagramErrorResponse {
  error_type: string;
  code: number;
  error_message: string;
}

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  private getClientId(): string {
    return this.configService.get<string>('INSTAGRAM_CLIENT_ID', '');
  }

  private getRedirectUri(): string {
    return this.configService.get<string>('INSTAGRAM_REDIRECT_URI', '');
  }

  public getAuthorizationUrl(): string {
    const clientId = this.getClientId();
    const redirectUri = encodeURIComponent(this.getRedirectUri());
    const scope = encodeURIComponent('user_profile,user_media');
    const responseType = 'code';

    return `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
  }

  public async exchangeCodeForToken(
    code: string,
  ): Promise<InstagramAuthResponse> {
    const clientId = this.getClientId();
    const clientSecret = this.configService.get<string>(
      'INSTAGRAM_CLIENT_SECRET',
      '',
    );
    const redirectUri = this.getRedirectUri();

    const url = 'https://api.instagram.com/oauth/access_token';
    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code: code,
    });

    try {
      const response = await axios.post<InstagramAuthResponse>(
        url,
        body.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const axiosError = error as AxiosError<InstagramErrorResponse>;
      throw new Error(
        `Failed to exchange code for token: ${
          axiosError.response?.data.error_message || error.message
        }`,
      );
    }
  }
}
