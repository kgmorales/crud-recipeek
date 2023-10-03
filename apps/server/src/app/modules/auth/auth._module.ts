// import { Module } from '@nestjs/common';
// import { AuthService } from './auth._service';
// import { UsersModule } from '../users/users._module';
// import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './local.strategy';
// import { JwtStrategy } from './jwt.strategy';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { AuthController } from './auth._controller';
// @Module({
//   imports: [
//     UsersModule,
//     PassportModule,
//     JwtModule.register({
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '60s' },
//     }),
//   ],
//   providers: [AuthService, LocalStrategy, JwtStrategy],
//   exports: [AuthService],
//   controllers: [AuthController],
// })
// export class AuthModule {}
