import { Module } from '@nestjs/common';

//* Controllers
import { ControllersModule } from './controllers/controllers._module';

//* Services
import { ServicesModule } from './services/services._module';
import { SharedModule } from '@modules/shared/shared._module';

const imports = [ControllersModule, SharedModule, ServicesModule];

@Module({
  imports,
})
export class BlogModule {}
