import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [UserModule],
  providers: [AuthService, LocalStrategy, GoogleStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
