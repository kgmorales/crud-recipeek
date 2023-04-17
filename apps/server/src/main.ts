import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // const options = new DocumentBuilder()
  //   .setTitle('lamora')
  //   .setDescription('a documentation for recipes')
  //   .setVersion('1.0')
  //   .addTag('Recipes')
  //   .build();

  // const appDocument = SwaggerModule.createDocument(app, options, {
  //   include: [RecipeModule],
  // });

  // SwaggerModule.setup('api', app, appDocument);

  await app.listen(8080);
}

bootstrap();
