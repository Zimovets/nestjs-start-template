import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration, { validationSchema } from 'src/config/configuration';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validationSchema,
    }),
    MikroOrmModule.forRoot(),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}

// TODO: implement validation
// TODO:  auth with email password
// TODO: end-to-end test to check user dto validation and db validation
