import { Controller, Get, Logger } from '@nestjs/common';
import { SpotifyService } from '../services/spotify._service';

@Controller('social/spotify')
export class SpotifyController {
  private readonly logger = new Logger(SpotifyController.name);

  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('now-playing')
  async getNowPlaying() {
    const nowPlaying = await this.spotifyService.getNowPlaying();
    this.logger.log(nowPlaying);
    return nowPlaying;
  }
}
