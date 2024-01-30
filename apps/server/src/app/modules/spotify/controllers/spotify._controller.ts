// spotify.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SpotifyService } from '../services/spotify._service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Request } from 'request';

interface CustomRequest extends Request {
  user: {
    spotifyAccessToken: string;
  };
}

@Controller('spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('now-playing')
  async getNowPlaying(@Req() req: CustomRequest) {
    return await this.spotifyService.getNowPlaying(req.user.spotifyAccessToken);
  }
}
