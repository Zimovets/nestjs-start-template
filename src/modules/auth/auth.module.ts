import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [UserModule],
  providers: [AuthService, LocalStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
