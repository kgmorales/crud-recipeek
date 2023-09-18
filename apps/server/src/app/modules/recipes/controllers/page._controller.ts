//* NESTJS
import { Controller, Get } from '@nestjs/common';

//* Module
import { PageService } from '../services/page._service';
import { HomeDto } from '../dtos/page/home.dto';

@Controller('page')
export class PageController {
  constructor(private readonly pagesService: PageService) {}

  @Get('home')
  async getHome(): Promise<HomeDto> {
    return await this.pagesService.getHome();
  }
}
