import { Controller, Get, Query } from '@nestjs/common';
import { SpotifyService } from '../services/spotify._service';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('now-playing')
  async nowPlaying() {
    return await this.spotifyService.buildNowPlaying();
  }
}
