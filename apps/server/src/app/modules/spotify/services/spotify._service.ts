import { Injectable, Inject,} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';


@Injectable()
export class SpotifyService {
  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async getAccessToken(): Promise<string> {
    let token = await this.cacheManager.get<string>('spotifyAccessToken');
    const expiry = await this.cacheManager.get<number>('spotifyTokenExpiry');
    const refreshToken = await this.cacheManager.get<string>(
      'spotifyRefreshToken',
    );

    if (!token || !expiry || Date.now() >= expiry) {
      if (!refreshToken) {
        throw new Error(
          'Spotify refresh token is missing. Please authenticate again.',
        );
      }
      token = await this.refreshAccessToken(refreshToken);
    }

    return token;
  }

  private async refreshAccessToken(refreshToken: string): Promise<string> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${this.configService.get<string>(
            'spotify.clientID',
          )}:${this.configService.get<string>('spotify.clientSecret')}`,
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh Spotify access token');
    }

    const { access_token, expires_in } = await response.json();
    await this.cacheManager.set('spotifyAccessToken', access_token, expires_in);
    await this.cacheManager.set(
      'spotifyTokenExpiry',
      Date.now() + expires_in * 1000,
    );

    return access_token;
  }

  public async getNowPlaying(): Promise<any> {
    const accessToken = await this.getAccessToken();

    const response = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch currently playing track from Spotify');
    }

    return await response.json();
  }
}
