import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

import { AppModule } from './app/app._module';

async function bootstrap() {
  const logger = new Logger('HTTP');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );

  //? GLOBAL PREFIX
  app.setGlobalPrefix('api');

  // //? COOKIES
  // app.register(() => fastifyCookie, { secret: 'my-secret' } as FastifyCookieOptions);

  //? LOGGER
  app
    .getHttpAdapter()
    .getInstance()
    .addHook('onSend', (request, reply, payload, done) => {
      const { statusCode } = reply;
      logger.log(`$${statusCode}${request.method} - ${request.url}`);
      done();
    });

  //? SWAGGER
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

  //? SERVER GO

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
