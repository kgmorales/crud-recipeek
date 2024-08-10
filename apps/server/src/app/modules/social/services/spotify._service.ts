import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { btoa } from 'buffer';
import { SpotifyController } from '../controllers/spotify._controller';

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

@Injectable()
export class SpotifyService implements OnModuleInit {
  logger = new Logger(SpotifyController.name);
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

    if (!response.ok) {
      throw new HttpException(
        `Failed to get access token: ${response.statusText}`,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return await response.json();
  }

  async getNowPlaying() {
    const { access_token } = await this.getAccessToken();

    let response = await fetch(NOW_PLAYING_ENDPOINT, {
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

    const track = await response.json();

    if (!track.item || !track.is_playing) {
      // If no track is currently playing, fetch the last played track
      console.log(
        'No track is currently playing, fetching the last played track.',
      );
      return this.getLastPlayedTrack(access_token);
    }

    return this.formatTrackData(track);
  }

  async getLastPlayedTrack(access_token: string) {
    const response = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=1`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error fetching Recently Played: ${response.status} - ${errorText}`,
      );
      throw new HttpException(
        `Error fetching Recently Played: ${response.status} - ${errorText}`,
        HttpStatus.BAD_GATEWAY,
      );
    }

    const recentTracks = await response.json();
    const lastPlayedTrack = recentTracks.items[0].track;

    this.logger.log(lastPlayedTrack);
    return this.formatTrackData({
      item: lastPlayedTrack,
      is_playing: false,
    });
  }

  private formatTrackData(track: any) {
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
