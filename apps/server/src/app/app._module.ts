import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaClient } from '@prisma/client';

// * Modules
import { BlogModule } from '@modules/blog/blog._module';
import { RecipesModule } from '@modules/recipes/recipes._module';
import { SharedModule } from '@modules/shared/shared._module';

//? Config
import configuration from './config/config';
import { JwtModule } from '@nestjs/jwt';
import { SocialModule } from '@modules/social/social._module';
import { AuthModule } from '@modules/auth/auth._module';

@Module({
  imports: [
    AuthModule,
    CacheModule.register({ isGlobal: true, ttl: 60 * 60 }),
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
    BlogModule,
    RecipesModule,
    SocialModule,
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
