import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

  const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token?`;

@Injectable()
export class SpotifyService {


  constructor(private configService: ConfigService){}

  async buildAuthConfig() {
    return {
      clientID: this.configService.get<string>('SPOTIFY_CLIENT_ID') as string,
      clientSecret: this.configService.get<string>('SPOTIFY_CLIENT_SECRET') as string,
      refreshToken: 
    }
    const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

    if (
      !SPOTIFY_CLIENT_ID ||
      !SPOTIFY_CLIENT_SECRET ||
      !SPOTIFY_REFRESH_TOKEN
    ) {
      throw new Error('Missing Spotify environment variables');
    }

    const BASIC = Buffer.from(
      `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
    ).toString('base64');
    const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
    const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token?`;
  }

  BASIC = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
    'base64',
  );
  NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
  TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token?`;

  getAccessToken = async () => {
    const TOKEN_URL =
      this.TOKEN_ENDPOINT +
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      });
    const response = await fetch(TOKEN_URL, {
      headers: {
        Authorization: `Basic ${BASIC}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    return response.json();
  };

  private async refreshAccessToken(refreshToken: string): Promise<any> {
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
      throw new Error('Failed to refresh Spotify access token.');
    }

    return await response.json();
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

    const data = await response.json();

    if (!data.item) {
      return { isPlaying: false };
    }

    return {
      album: {
        name: data.item.album.name,
        href: data.item.album.external_urls.spotify,
        image: data.item.album.images[0], // Assuming you want the first image (highest resolution)
      },
      artists: data.item.artists.map(
        (artist: { name: any; external_urls: { spotify: any }; id: any }) => ({
          name: artist.name,
          href: artist.external_urls.spotify,
          id: artist.id,
        }),
      ),
      href: data.item.external_urls.spotify,
      isPlaying: data.is_playing,
      title: data.item.name,
    };
  }
}
