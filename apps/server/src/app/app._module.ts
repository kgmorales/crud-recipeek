import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaClient } from '@prisma/client';

// * Modules
// import { BlogModule } from '@modules/blog/blog._module';
import { RecipesModule } from '@modules/recipes/recipes._module';
import { SearchModule } from '@modules/search/search._module';
import { SharedModule } from '@modules/shared/shared._module';

//? Config
import configuration from './config/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('paprika.jwtSecret');
        if (!secret) throw new Error('JWT Secret is undefined');

        return {
          secret,
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
    RecipesModule,
    SearchModule,
    SharedModule,
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
