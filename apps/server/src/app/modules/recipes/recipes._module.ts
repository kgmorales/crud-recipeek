import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

//* Controllers
import { ControllersModule } from './controllers/controllers.module';
//* Middleware
import { BooleanConversionMiddleware } from './middleware/boolean-conversion.middleware';
//* Services
import { ServicesModule } from './services/services._module';

//? Imports
const imports = [ControllersModule, ServicesModule];

@Module({
  imports,
})
export class RecipesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BooleanConversionMiddleware).forRoutes('recipes/filter');
  }
}
