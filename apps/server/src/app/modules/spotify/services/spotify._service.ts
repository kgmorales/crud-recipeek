// spotify.service.ts
import { Injectable } from '@nestjs/common';
import { SpotifyArtist, SpotifyNowPlaying } from '@server/types/spotify.types';

@Injectable()
export class SpotifyService {
  async getNowPlaying(
    spotifyAccessToken: string,
  ): Promise<Partial<SpotifyNowPlaying>> {
    const url = 'https://api.spotify.com/v1/me/player/currently-playing';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${spotifyAccessToken}` },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Now Playing data: ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (!data.is_playing || !data.item) {
        return { isPlaying: false };
      }

      return {
        isPlaying: data.is_playing,
        title: data.item.name,
        artist: data.item.artists
          .map((artist: SpotifyArtist) => artist.name)
          .join(', '),
        album: data.item.album.name,
        albumImgUrl: data.item.album.images[0]?.url,
        songUrl: data.item.external_urls.spotify,
      };
    } catch (error) {
      console.error('Error fetching Now Playing from Spotify:', error);
      throw new Error('Failed to fetch Now Playing data');
    }
  }
}
