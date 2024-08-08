import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { AppModule } from './app/app._module';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./apps/server/.secrets/key.pem'),
    cert: fs.readFileSync('./apps/server/.secrets/cert.pem'),
  };
  const logger = new Logger('HTTPS');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ https: httpsOptions }),
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
  // const config = new DocumentBuilder()
  //   .setTitle('lamora')
  //   .setDescription('a documentation for recipes')
  //   .setVersion('1.0')
  //   .addTag('Recipes')
  //   .build();

  // const options: SwaggerDocumentOptions = {
  //   operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  // };

  // const appDocument = SwaggerModule.createDocument(app, config, options);

  // SwaggerModule.setup('api', app, appDocument);

  //? SERVER GO

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
