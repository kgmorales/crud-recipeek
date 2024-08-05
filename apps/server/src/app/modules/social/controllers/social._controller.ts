import { Controller, Get } from '@nestjs/common';
import { SpotifyService } from '../services/spotify._service';
import { InstagramService } from '../services/instagram._service';

@Controller('social')
export class SocialController {
  constructor(
    // private instagramService: InstagramService,
    private spotifyService: SpotifyService,
  ) {}

  @Get('now-playing')
  async getNowPlaying() {
    return this.spotifyService.getNowPlaying();
  }

  // @Get('instafeed')
  // async getInstaFeed() {
  //   return this.instagramService.getInstaFeed();
  // }
}
