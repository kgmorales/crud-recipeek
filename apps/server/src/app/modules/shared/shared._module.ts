import { Module } from '@nestjs/common';

import { ServicesModule } from './services/services._module';

const modules = [ServicesModule];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
