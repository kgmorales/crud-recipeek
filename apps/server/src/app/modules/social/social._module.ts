import { Module } from '@nestjs/common';

//* Controllers
import { ControllersModule } from './controllers/controllers._module';

//* Services
import { ServicesModule } from './services/services._module';

const imports = [ControllersModule, ServicesModule];

@Module({
  imports,
})
export class SocialModule {}
