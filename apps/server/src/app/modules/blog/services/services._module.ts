import { Module } from '@nestjs/common';

import { BlogService } from './blog._service';

const services = [BlogService];

@Module({
  providers: services,
  exports: services,
})
export class ServicesModule {}
