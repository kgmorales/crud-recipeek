import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token?`;

@Injectable()
export class SpotifyService {
  constructor(private configService: ConfigService) {}

  getAccessToken = async () => {
    const CLIENT_ID = this.configService.get('SPOTIFY_CLIENT_ID') as string;
    const CLIENT_SECRET = this.configService.get(
      'SPOTIFY_CLIENT_SECRET',
    ) as string;
    const REFRESH_TOKEN = this.configService.get(
      'SPOTIFY_REFRESH_TOKEN',
    ) as string;
    const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      'base64',
    );

    const TOKEN_URL =
      TOKEN_ENDPOINT +
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
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

  async getCurrentlyPlaying() {
    const { access_token } = await this.getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }

  async buildNowPlaying() {
    const response = await this.getCurrentlyPlaying();

    const track = await response.json();

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

    return JSON.stringify({
      album,
      artists,
      href,
      isPlaying,
      title,
    });
  }
}
