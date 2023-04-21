import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './modules/recipe/recipes._module';

import configuration from './config/config';

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
  providers: [ConfigService],
})
export class AppModule {}
