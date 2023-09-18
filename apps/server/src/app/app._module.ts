import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { CacheModule } from '@nestjs/cache-manager';
import { PrismaClient } from '@prisma/client';
import { RecipesModule } from '@recipes/recipes._module';

import configuration from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    // CacheModule.register({ isGlobal: true }),
    RecipesModule,
  ],
  providers: [
    {
      provide: PrismaClient,
      useFactory: (configService: ConfigService) => {
        const prisma = new PrismaClient({
          datasources: {
            db: {
              url: configService.get('prisma.dbURL'),
            },
          },
        });
        prisma.$connect();
        return prisma;
      },
      inject: [ConfigService],
    },
  ],
  exports: [PrismaClient],
})
export class AppModule {}
