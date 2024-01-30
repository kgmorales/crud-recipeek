import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyService {
  constructor(private configService: ConfigService) {}

  async getNowPlaying(): Promise<any> {
    return {
      //     album: {
      //       name: data.item.album.name,
      //       href: data.item.album.external_urls.spotify,
      //       image: data.item.album.images[0], // Assuming you want the first image (highest resolution)
      //     },
      //     artists: data.item.artists.map(
      //       (artist: { name: any; external_urls: { spotify: any }; id: any }) => ({
      //         name: artist.name,
      //         href: artist.external_urls.spotify,
      //         id: artist.id,
      //       }),
      //     ),
      //     href: data.item.external_urls.spotify,
      //     isPlaying: data.is_playing,
      //     title: data.item.name,
      //   };
    };
  }
}
