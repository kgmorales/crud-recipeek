import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const INSTAGRAM_ENDPOINT = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink&access_token=`;

@Injectable()
export class InstagramService implements OnModuleInit {
  private config: {
    instagramURL: string;
  };
  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    this.config = await this.buildAuthConfig();
  }

  private async buildAuthConfig() {
    const token = this.configService.getOrThrow<string>(
      'INSTAGRAM_TOKEN',
    ) as string;

    const instagramURL = `${INSTAGRAM_ENDPOINT}${token}`;

    return { instagramURL };
  }

  async getInstaFeed() {
    const rawData = await fetch(this.config.instagramURL);
    const feed = await rawData.json();

    return feed;
  }
}
