import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app._module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  // const options = new DocumentBuilder()
  //   .setTitle('lamora')
  //   .setDescription('a documentation for recipes')
  //   .setVersion('1.0')
  //   .addTag('Recipes')
  //   .build();

  // const appDocument = SwaggerModule.createDocument(app, options, {
  //   include: [],
  // });

  // SwaggerModule.setup('api', app, appDocument);

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
