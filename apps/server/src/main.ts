import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app._module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('lamora')
    .setDescription('a documentation for recipes')
    .setVersion('1.0')
    .addTag('Recipes')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const appDocument = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, appDocument);

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
