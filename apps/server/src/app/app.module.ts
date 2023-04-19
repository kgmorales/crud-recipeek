import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './modules/recipe/recipes.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';

const configOptions = {
  config: {
    load: [configuration],
    isGlobal: true,
    envFilePath: '../../.env',
    cache: true,
  },
  mongoDB: {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get('mongoDB.uri'),
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    inject: [ConfigService],
  },
};

@Module({
  imports: [
    ConfigModule.forRoot(configOptions.config),
    MongooseModule.forRootAsync(configOptions.mongoDB),
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
