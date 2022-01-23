import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './constants';
import { RolesGuard } from './roles/guards/roles.guard';


@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRY_IN_SECONDS+'s' },
    }),],
    controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersModule, RolesGuard],
  exports: [AuthService]
})
export class AuthModule {}