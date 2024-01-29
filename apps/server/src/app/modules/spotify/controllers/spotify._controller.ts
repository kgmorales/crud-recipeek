import { Controller, Get, Res } from '@nestjs/common';
import { SpotifyService } from '../services/spotify._service';
import { Response } from 'express';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('now-playing')
  async getNowPlaying(@Res() res: Response) {
    try {
      const nowPlaying = await this.spotifyService.getNowPlaying();
      res.json(nowPlaying);
    } catch (error) {
      console.error('Error fetching Now Playing data:', error);
      res.status(500).json({ message: 'Failed to fetch Now Playing data' });
    }
  }
}
