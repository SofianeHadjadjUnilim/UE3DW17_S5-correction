import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';


@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRY_IN_SECONDS+'s' },
    }),],
    controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersModule],
  exports: [AuthService]
})
export class AuthModule {}