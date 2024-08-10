import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Redirect,
  Logger,
} from '@nestjs/common';
import { InstagramService } from '../services/instagram._service';

@Controller('social/instagram')
export class InstagramController {
  private readonly logger = new Logger(InstagramController.name);

  constructor(private readonly instagramService: InstagramService) {}

  @Get('authorize')
  @Redirect()
  authorize() {
    const url = this.instagramService.getAuthorizationUrl();
    this.logger.debug(`Redirecting to Instagram authorize URL: ${url}`);
    return { url };
  }

  @Get('redirect')
  async redirect(@Query('code') code: string) {
    this.logger.debug(`Received code: ${code}`);

    if (!code) {
      this.logger.error('Code is missing in the redirect URL');
      throw new BadRequestException('Code is required');
    }

    try {
      const shortTermToken =
        await this.instagramService.exchangeCodeForShortTermToken(code);
      this.logger.debug(`Received shortTermToken: ${shortTermToken}`);
      const longTermToken =
        await this.instagramService.exchangeForLongTermToken(shortTermToken);
      this.logger.debug(`Received longTermToken: ${longTermToken}`);

      // Store the long term token
      await this.instagramService.storeToken(longTermToken);

      return { message: 'Token stored successfully' };
    } catch (error: any) {
      this.logger.error(`Error during token exchange: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  @Get('feed')
  async getMedia() {
    try {
      const media = await this.instagramService.getUserMedia();

      return media;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
