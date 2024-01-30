import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { btoa } from 'buffer';

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

@Injectable()
export class SpotifyService implements OnModuleInit {
  private config: {
    client_id: string;
    client_secret: string;
    refresh_token: string;
    basic: string;
  };
  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    this.config = await this.buildAuthConfig();
  }

  async buildAuthConfig() {
    const client_id = this.configService.get<string>(
      'SPOTIFY_CLIENT_ID',
    ) as string;
    const client_secret = this.configService.get<string>(
      'SPOTIFY_CLIENT_SECRET',
    ) as string;
    const refresh_token = this.configService.get<string>(
      'SPOTIFY_REFRESH_TOKEN',
    ) as string;

    const basic = btoa(`${client_id}:${client_secret}`);

    return { client_id, client_secret, refresh_token, basic };
  }

  async getAccessToken() {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.config.basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.config.refresh_token,
      }),
    });

    return await response.json();
  }

  async getNowPlaying() {
    const { access_token } = await this.getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error fetching Now Playing: ${response.status} - ${errorText}`,
      );
      throw new HttpException(
        `Error fetching Now Playing: ${response.status} - ${errorText}`,
        HttpStatus.BAD_GATEWAY,
      );
    }

    // Check if the response is JSON before parsing
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Received non-JSON response from Spotify API');
      throw new HttpException(
        'Non-JSON response received from Spotify API',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const track = await response.json();
    if (!track.item) {
      // Handle cases where there's no currently playing track
      return { isPlaying: false };
    }

    const album = {
      name: track.item.album.name,
      href: track.item.album.external_urls.spotify,
      image: {
        height: track.item.album.images[0].height,
        href: track.item.album.images[0].url,
        width: track.item.album.images[0].width,
      },
    };
    const artists = track.item.artists.map((artist: any) => ({
      name: artist.name,
      href: artist.external_urls.spotify,
      id: artist.id,
    }));
    const href = track.item.external_urls.spotify;
    const isPlaying = track.is_playing;
    const title = track.item.name;

    return {
      album,
      artists,
      href,
      isPlaying,
      title,
    };
  }
}
