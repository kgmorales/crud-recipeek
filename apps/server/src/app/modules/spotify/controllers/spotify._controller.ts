import { Controller, Get, Res } from '@nestjs/common';
import { SpotifyService } from '../services/spotify._service';

@Controller('spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}

  @Get('now-playing')
  async getNowPlaying() {
    return this.spotifyService.getNowPlaying();
  }
}
