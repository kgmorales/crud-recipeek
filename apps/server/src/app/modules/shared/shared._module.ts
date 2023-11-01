import { Module } from '@nestjs/common';

import { ServicesModule } from './services/services._module';

const imports = [ServicesModule];

@Module({
  imports: [...imports],
})
export class SharedModule {}
